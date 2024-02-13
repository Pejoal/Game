<script setup>
import Navigations from "@/Components/Navigations.vue";
</script>

<template>
  <footer class="bg-gray-900 text-white py-8">
    <main class="container mx-auto flex flex-wrap justify-between">
      <section class="w-full sm:w-1/2 md:w-1/4 px-4 mb-8">
        <h2 class="h-20 text-2xl font-semibold mb-4">
          {{ trans("words.my_drive_school") }}
        </h2>
        <p>
          Seit 1948 gibt es nun schon den KGV Papenwinkel im Herzen des
          Weserberglandes. Besuchen Sie uns gerne! […]
        </p>
      </section>

      <section class="w-full sm:w-1/2 md:w-1/4 px-4 mb-8">
        <h2 class="h-20 text-2xl font-semibold mb-4">
          {{ trans("words.links_of_website") }}
        </h2>
        <Navigations :vertical="true" />
      </section>

      <section class="w-full sm:w-1/2 md:w-1/4 px-4 mb-8">
        <h2 class="h-20 text-2xl font-semibold mb-4">
          {{ trans("words.best_of_my_drive_school") }}
        </h2>
        ABC
      </section>

      <section class="w-full sm:w-1/2 md:w-1/4 px-4 mb-8">
        <h2 class="h-20 text-2xl font-semibold mb-4">Aushang</h2>

        <article class="text-lg space-y-2">
          <p class="text-gray-200"><a href="#">Bürozeiten: </a></p>
          <hr />
          <p class="text-zinc-200">Samstags: 10:00 Uhr - 12:00 Uhr.</p>
          <p class="text-zinc-200">Mittwochs: 16:00 Uhr - 18:00 Uhr.</p>
          <p class="text-zinc-200">Samstags: 10:00 Uhr - 12:00 Uhr.</p>
          <p class="mb-2 text-zinc-200">
            in der Winterpause entfällt die Erreichbarkeit am Samstag.
          </p>

          <hr />

          <p class="mt-2 text-gray-200">
            <a href="tel:0176/40172874">Mobil-Nr: 0176/40172874 </a>
          </p>
          <p class="text-gray-200">
            <a href="mailto:kgv1948@web.de">E-Mail: kgv1948@web.de </a>
          </p>
        </article>
      </section>
    </main>
  </footer>
  <section
    class="text-lg bg-zinc-900 text-white flex flex-col items-center justify-center p-4"
  >
    <p>
      {{ trans("words.copyright_all_rights_reserved") }}
      {{ trans("words.my_drive_school") }}
    </p>
    <p>
      <a href="mailto:pejoal.official@gmail.com" title="Mail Me"> Pejoal </a>
      -
      <a href="mailto:pejoal.official@gmail.com" title="Mail Me"> Zana </a>
    </p>
  </section>
</template>
