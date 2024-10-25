<!-- src/App.svelte -->
<script lang="ts">
  import { createSignal } from 'svelte';

  // Define the window interface for TypeScript
  declare global {
    interface Window {
      uuidAPI: {
        generateUUIDV1: () => Promise<string>;
        generateUUIDV3: (namespace: string, name: string) => Promise<string>;
        generateUUIDV4: () => Promise<string>;
        generateUUIDV5: (namespace: string, name: string) => Promise<string>;
      };
    }
  }

  const [selectedVersion, setSelectedVersion] = createSignal<string>('v4');
  const [namespace, setNamespace] = createSignal<string>('');
  const [name, setName] = createSignal<string>('');
  const [generatedUUID, setGeneratedUUID] = createSignal<string>('');
  const [error, setError] = createSignal<string>('');

  async function generateUUID() {
    try {
      setError('');
      let uuid = '';
      
      switch (selectedVersion()) {
        case 'v1':
          uuid = await window.uuidAPI.generateUUIDV1();
          break;
        case 'v3':
          uuid = await window.uuidAPI.generateUUIDV3(namespace(), name());
          break;
        case 'v4':
          uuid = await window.uuidAPI.generateUUIDV4();
          break;
        case 'v5':
          uuid = await window.uuidAPI.generateUUIDV5(namespace(), name());
          break;
      }
      
      setGeneratedUUID(uuid);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error generating UUID:', err);
    }
  }

  $effect(() => {
    if (selectedVersion() === 'v4') {
      setNamespace('');
      setName('');
    }
  });

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(generatedUUID());
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  }
</script>

<main class="container mx-auto p-4 max-w-2xl">
  <h1 class="text-3xl font-bold mb-6">UUID Generator</h1>
  
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium mb-2">
        UUID Version
      </label>
      <select
        class="w-full p-2 border rounded"
        value={selectedVersion()}
        on:change={(e) => setSelectedVersion(e.currentTarget.value)}
      >
        <option value="v1">Version 1 (Timestamp)</option>
        <option value="v3">Version 3 (MD5)</option>
        <option value="v4">Version 4 (Random)</option>
        <option value="v5">Version 5 (SHA-1)</option>
      </select>
    </div>

    {#if selectedVersion() === 'v3' || selectedVersion() === 'v5'}
      <div>
        <label class="block text-sm font-medium mb-2">
          Namespace UUID
        </label>
        <input
          type="text"
          class="w-full p-2 border rounded"
          placeholder="Enter namespace UUID"
          value={namespace()}
          on:input={(e) => setNamespace(e.currentTarget.value)}
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          class="w-full p-2 border rounded"
          placeholder="Enter name"
          value={name()}
          on:input={(e) => setName(e.currentTarget.value)}
        />
      </div>
    {/if}

    {#if error()}
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error()}
      </div>
    {/if}

    <button
      class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      on:click={generateUUID}
    >
      Generate UUID
    </button>

    {#if generatedUUID()}
      <div class="mt-4">
        <label class="block text-sm font-medium mb-2">
          Generated UUID
        </label>
        <div class="flex">
          <input
            type="text"
            readonly
            class="w-full p-2 border rounded-l bg-gray-50"
            value={generatedUUID()}
          />
          <button
            class="px-4 py-2 bg-gray-200 rounded-r hover:bg-gray-300"
            on:click={copyToClipboard}
          >
            Copy
          </button>
        </div>
      </div>
    {/if}
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
</style>