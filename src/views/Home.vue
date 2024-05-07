<template>
  <div>
    <!-- Hero section -->
    <div class="bg-gray-100">
      <div class="container mx-auto flex justify-between items-center py-24">
        <div class="md:w-1/2">
          <h1 class="text-4xl md:text-6xl font-bold text-gray-800 mb-4">Selamat Datang Di Seller Center Hastasik</h1>
          <router-link to="/login" class="btn-primary inline-block px-10 py-3 bg-sky-500 text-white font-bold rounded-full mr-4">Masuk</router-link>
          <router-link to="/register" class="btn-secondary inline-block px-10 py-3 text-white font-bold rounded-full bg-gray-800">Daftar</router-link>
        </div>
        <div class="md:w-1/2">
          <img src="../assets/images/payung.jpg" alt="Hero Image" class="w-full rounded-lg shadow-lg">
        </div>
      </div>
    </div>

    <!-- Testimonial section -->
    <div class="container mx-auto py-16">
      <h2 class="text-center text-3xl font-bold mb-8">Testimoni Seller</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="testimonial bg-white p-8 rounded-lg shadow-md">
          <p class="text-gray-700 text-lg">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed neque mauris."</p>
          <p class="text-right mt-4 text-gray-800 font-semibold">John Doe</p>
        </div>
        <!-- Repeat for other testimonials -->
      </div>
    </div>

    <!-- About section -->
    <div class="bg-gray-100 py-16">
      <div class="container mx-auto flex items-center justify-between gap-10">
        <div class="md:w-1/2">
          <h2 class="text-3xl font-bold mb-8">Tentang Kami</h2>
          <p class="text-gray-700 text-lg mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at mollis lorem. Sed congue placerat mauris, et vehicula risus scelerisque a. Integer ultricies lacus non risus consequat, at condimentum dui maximus. Nulla facilisi.</p>
          <p class="text-gray-700 text-lg">Praesent lacinia dolor id justo tempor, sed scelerisque lorem tincidunt. Vivamus sollicitudin dui sed nibh tempus aliquet. Nam scelerisque fermentum tellus, sed sollicitudin eros finibus a. Quisque sit amet ex arcu.</p>
        </div>
        <div class="md:w-1/2">
          <img src="../assets/images/virgi2.jpg" alt="Foto CEO" class="w-full rounded-lg shadow-lg">
        </div>
      </div>
    </div>

    <!-- Footer section -->
    <footer class="bg-gray-800 text-white py-8">
      <div class="container mx-auto flex justify-between items-center">
        <div>
          <a href="https://coreui.io" class="text-gray-400 hover:text-white">Hastasik</a>
          <span class="ml-2">&copy; 2022 creativeLabs.</span>
        </div>
        <div>
          <span>Powered by</span>
          <a href="" class="text-gray-400 hover:text-white">Hastasik</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
</script>
