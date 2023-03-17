<script setup lang="ts">
import { author, version } from '../../package.json'
</script>
<template>
  <v-sheet>
    <v-container>
      <v-row>
        <v-col cols="12" class="text-center">
          <h1 class="text-h1">The Grid</h1>
          <div class="text-left px-10">
            <h2 class="text-h5 text-center my-2">Objectives</h2>
            <ul>
              <li>Provide a private solution that guarantees privacy and content ownership for its users</li>
              <li>Enable collaboration in creating news reports and blog articles</li>
              <li>
                The Grid aims to make the process of creating news reports and blog articles as efficient and
                straightforward as possible
              </li>
            </ul>
            <h2 class="text-h5 text-center my-2">Core Concepts</h2>
            <ul>
              <li>
                <span class="font-weight-black">Assets</span>: Topics or particular assets that activities and articles
                would be about
              </li>
              <li>
                <span class="font-weight-black">Activities</span>: Something that the users did and is related to one or
                more assets
              </li>
              <li><span class="font-weight-black">Tasks</span>: To track work on articles</li>
              <li>
                <span class="font-weight-black">Articles</span>: [not implemented] Final product; a report, summary, or
                blog article
              </li>
              <li>
                <span class="font-weight-black">Comments</span>: [not implemented] Text communication on other entities
              </li>
            </ul>
            <h2 class="text-h5 text-center my-2">Core Features</h2>
            <ul>
              <li>Persistence of structured information</li>
              <li>Easy retrieval of information</li>
              <li>Simple task management</li>
            </ul>
            <h2 class="text-h5 text-center my-2">Narrative</h2>
            <ul>
              <li>Too many news and research outlets in a digital age are making it hard to find meaningful data.</li>
              <li>
                Researches and individual reporters have to depend on either low level tools that don't provide them the
                help they need or utilise online services that mostly don't respect their privacy and ownership and
                provide them with too many unnecessary features.
              </li>
              <li>
                The Grid is trying to be a building block in any research facility or media agency that want to preserve
                their ownership, persist structured information, and retrieve it to produce research papers and news
                articles.
              </li>
              <li>
                The Grid itself is made out of multiple components that are easy to deploy, upgrade, and even replace
                altogether.
              </li>
            </ul>
          </div>
          <p class="text-h6">Thank you for testing!</p>
          <label>
            The Grid <code>{{ version }}</code> by {{ author }}
          </label>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<style></style>
