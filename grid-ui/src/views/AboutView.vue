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
              <li>Offer a private solution ensuring user privacy and content ownership</li>
              <li>Streamline the workflow for creating news reports, blog articles, and research papers</li>
              <li>Optimize the authoring process for efficiency and simplicity</li>
            </ul>
            <h2 class="text-h5 text-center my-2">Core Concepts</h2>
            <ul>
              <li>
                <span class="font-weight-black">Assets</span>: Broad topics or specific subjects that activities and
                articles revolve around
              </li>
              <li>
                <span class="font-weight-black">Activities</span>: User actions associated with one or more assets
              </li>
              <li>
                <span class="font-weight-black">Tasks</span>: Progress tracking for article and research paper
                development
              </li>
              <li>
                <span class="font-weight-black">Articles</span>: [not implemented] The final output, such as reports,
                summaries, blog articles, or research papers
              </li>
              <li>
                <span class="font-weight-black">Comments</span>: [not implemented] Text communication on assets,
                activities, tasks, and other entities
              </li>
            </ul>
            <h2 class="text-h5 text-center my-2">Core Features</h2>
            <ul>
              <li>Structured information storage</li>
              <li>Effortless information retrieval</li>
              <li>Streamlined task management</li>
            </ul>
            <h2 class="text-h5 text-center my-2">Narrative</h2>
            <ul>
              <li>The digital age's abundance of news and research outlets hinders finding meaningful data.</li>
              <li>
                Researchers and reporters struggle with inadequate tools or privacy-invading online services with
                excessive features.
              </li>
              <li>
                The Grid aims to support research facilities and media agencies by preserving ownership, storing
                structured information, and aiding in research paper and news article production.
              </li>
              <li>
                Comprising easy-to-deploy, upgradable, and replaceable components, The Grid offers flexibility and
                adaptability.
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
