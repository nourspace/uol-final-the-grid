<script setup lang="ts">
import { mdiInformationOutline } from '@mdi/js'
/**
 * Todo
 * - sort
 * - paginate
 */
import { computed, ref } from 'vue'

export interface Props {
  headers: any[]
  items: []
  loading?: boolean
  error?: Error | null
  newLabel: string
  searchTerm: string
  searchLabel?: string
  searchPlaceholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  newLabel: 'New Item',
  searchLabel: 'Search Items',
  searchPlaceholder: 'Type item name',
})

const emit = defineEmits(['update:searchTerm', 'click:row', 'click:new'])

const itemsPerPage = ref(50)

const _searchTerm = computed({
  get: () => props.searchTerm,
  set: (value) => emit('update:searchTerm', value),
})
</script>

<template>
  <!-- DataTable -->
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="props.headers"
    :items="items"
    :loading="loading"
    density="comfortable"
    fixed-header
    height="70vh"
    class="elevation-1"
  >
    <!-- Toolbar -->
    <template v-slot:top>
      <v-toolbar height="80" extension-height="80">
        <!-- Search field -->
        <v-text-field
          clearable
          @click:clear="_searchTerm = ''"
          hide-details
          variant="outlined"
          density="comfortable"
          v-model="_searchTerm"
          :label="searchLabel"
          :placeholder="searchPlaceholder"
          class="mx-4"
          style="flex: 3"
        />
        <v-spacer></v-spacer>
        <v-tooltip v-if="$slots['info-tool-tip']" location="top end">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" :icon="mdiInformationOutline" color="info"></v-btn>
          </template>
          <slot name="info-tool-tip"></slot>
        </v-tooltip>
        <!-- Create new -->
        <v-btn color="primary" dark @click="emit('click:new')" variant="outlined">{{ newLabel }}</v-btn>
        <template v-slot:extension v-if="error">
          <v-alert color="error" variant="outlined" class="mx-4" density="comfortable"> {{ error }}</v-alert>
        </template>
      </v-toolbar>
    </template>

    <!-- Custom rows -->
    <!-- rename to rowItem not to conflict with inner slots -->
    <template v-slot:item="{ item: rowItem }: { item: any }">
      <v-data-table-row :item="rowItem" :key="`item_${rowItem.value}`" @click="emit('click:row', rowItem.raw)">
        <!-- User custom columns to pass to inner v-data-table -->
        <!--  https://gist.github.com/loilo/73c55ed04917ecf5d682ec70a2a1b8e2 -->
        <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
          <slot :name="name" v-bind="slotData" />
        </template>

        <!-- Common custom columns -->
        <template v-slot:item.source="{ item }">
          <div class="v-data-table__td__source" @click.stop>
            <a :href="item.raw.source" target="_blank">{{ item.raw.source }}</a>
          </div>
        </template>
        <template v-slot:item.url="{ item }">
          <div class="v-data-table__td__url" @click.stop>
            <a :href="item.raw.url" target="_blank">{{ item.raw.url }}</a>
          </div>
        </template>
        <template v-slot:item.created_by="{ item }">
          {{ item.raw.created_by_object.username }}
        </template>
        <template v-slot:item.created_at="{ item }">
          {{ new Date(item.raw.created_at).toLocaleDateString() }}
        </template>
        <template v-slot:item.updated_at="{ item }">
          {{ new Date(item.raw.updated_at).toLocaleDateString() }}
        </template>
      </v-data-table-row>
    </template>
  </v-data-table-server>
</template>
