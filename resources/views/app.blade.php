<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <meta name="theme-color" content="#6777ef" />
  <link rel="apple-touch-icon" href="{{ asset('logo.png') }}">

  <title inertia>{{ config('app.name', 'Laravel') }}</title>

  <!-- Fonts -->
  <link rel="stylesheet" href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap">
  <link rel="stylesheet" href="{{ asset('plugins/fontawesome/css/all.min.css') }}">

  <!-- Scripts -->
  @routes
  @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])
  @inertiaHead
</head>

<body class="font-sans antialiased">
  @inertia
  <section class="fixed z-[990] top-2 right-2 bg-transparent transform transition-all duration-300 ease-in-out"
    id="toasts">
  </section>
  <section id="modal"></section>
  <script src="{{ asset('plugins/fontawesome/js/all.min.js') }}"></script>
  <link rel="stylesheet" href="{{ asset('plugins/chosen/chosen.min.css') }}">
  <script src="{{ asset('plugins/jquery.min.js') }}"></script>
  <script src="{{ asset('plugins/chosen/chosen.jquery.min.js') }}"></script>
  <script src="{{ asset('plugins/ckeditor/ckeditor.js') }}"></script>
</body>

</html>
