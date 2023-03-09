import "express-async-errors"; // Important to import on top
require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { gql } from "graphql-request";
import { client } from "./client";
import { generateJWT } from "./jwt";
import { body, validationResult } from "express-validator";

const app = express();
const port = process.env.PORT || "6000";

// Parse JSON in request bodies
app.use(express.json());

app.post(
  "/auth/register",
  // username must be an email
  body("username").not().isEmpty().isString().trim().escape().isString(),
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
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body as Record<string, string>;

    // In production app, you would check if user is already registered
    // We skip that in this tutorial for the sake of time

    // We insert the user using a mutation
    // Note that we salt and hash the password using bcrypt
    const { insert_users_one } = await client.request(
      gql`
        mutation registerUser($user: users_insert_input!) {
          insert_users_one(object: $user) {
            id
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

    const { id: userId } = insert_users_one;

    res.send({
      token: generateJWT({
        defaultRole: "user",
        allowedRoles: ["user"],
        otherClaims: {
          "X-Hasura-User-Id": userId,
        },
      }),
    });
  }
);

app.post("/auth/login", async (req: Request, res: Response) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body as Record<string, string>;

  const { users } = await client.request(
    gql`
      query getUserByUsername($username: String!) {
        users(where: { username: { _eq: $username } }) {
          id
          password
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
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    res.send({
      token: generateJWT({
        defaultRole: "user",
        allowedRoles: ["user"],
        otherClaims: {
          "X-Hasura-User-Id": user.id,
        },
      }),
    });
  } else {
    res.sendStatus(401);
  }
});

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
  res.status(500).send({ error: "Something failed!" });
}
