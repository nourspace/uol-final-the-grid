import "express-async-errors"; // Important to import on top
require("dotenv").config(); // Load .env
require("dotenv").config({ path: `.env.local`, override: true }); // Override with .env.local
import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { gql } from "graphql-request";
import { client } from "./client";
import { generateJWT } from "./jwt";
import { body, validationResult } from "express-validator";
import cors from "cors";

const app = express();
const port = process.env.PORT || "5050";
const corsOrigin = process.env.CORS_ORIGIN || "";
// Enable CORS when `CORS_ORIGIN` is set
const options: cors.CorsOptions = corsOrigin
  ? {
      origin: [corsOrigin],
    }
  : {};
app.use(cors(options));

// Parse JSON in request bodies
app.use(express.json());

app.post(
  "/auth/register",
  // username must be there
  body("username").not().isEmpty().isString().trim().escape(),
  // password must be at least 5 chars long
  body("password")
    .not()
    .isEmpty()
    .isString()
    .trim()
    .escape()
    .isLength({ min: 5 }),
  async (req: Request, res: Response) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { username, password } = req.body as Record<string, string>;

    // In production app, you would check if user is already registered
    // We skip that in this tutorial for the sake of time

    // We insert the user using a mutation
    // Note that we salt and hash the password using bcrypt
    // Todo (Nour): handle graphql errors
    const { user } = await client.request(
      gql`
        mutation registerUser($user: users_insert_input!) {
          user: insert_users_one(object: $user) {
            id
            username
          }
        }
      `,
      {
        user: {
          username,
          password: await bcrypt.hash(password, 10),
        },
      }
    );

    res.send({
      user,
      token: generateJWT({
        defaultRole: "user",
        allowedRoles: ["user"],
        otherClaims: {
          "X-Hasura-User-Id": `${user.id}`,
        },
      }),
    });
  }
);

app.post(
  "/auth/login",
  // username must be there
  body("username").not().isEmpty().isString().trim().escape(),
  // password must be there
  body("password").not().isEmpty().isString().trim().escape(),
  async (req: Request, res: Response) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { username, password } = req.body as Record<string, string>;

    // Todo (Nour): handle graphql errors
    const { users } = await client.request(
      gql`
        query getUserByUsername($username: String!) {
          users(where: { username: { _eq: $username } }) {
            id
            password
            username
          }
        }
      `,
      {
        username,
      }
    );

    // Since we filtered on a non-primary key we got an array back
    const user = users[0];

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Check if password matches the hashed version
    const { password: userPassword, ...userNoPass } = user;
    const passwordMatch = await bcrypt.compare(password, userPassword);
    if (passwordMatch) {
      res.send({
        user: userNoPass,
        token: generateJWT({
          defaultRole: "user",
          allowedRoles: ["user"],
          otherClaims: {
            "X-Hasura-User-Id": `${user.id}`,
          },
        }),
      });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  }
);

// Error handling
app.use(logErrors);
app.use(clientErrorHandler);

app.listen(port, () => {
  console.log(`Auth server running on port ${port}.`);
});

function logErrors(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);
  next(err);
}

function clientErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res
    .status(500)
    .send({ error: "Authentication failed. Please contact admin." });
}
