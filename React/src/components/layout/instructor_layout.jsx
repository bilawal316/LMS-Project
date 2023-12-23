import React from 'react';
import Layout_sidebar from "../sidebar"

const Instructor_layout = () => {

  return (
   <div class="min-h-screen w-screen overflow-hidden flex flex-col">
  <header class="bg-red-50">Header</header>

  <div class="flex-1 flex flex-col sm:flex-row">
    <main class="flex-1 bg-indigo-100">Content here</main>

    <nav class="order-first sm:w-auto bg-purple-200"><Layout_sidebar/></nav>
  </div>

  <footer class="bg-gray-100">Footer</footer>
</div>

  )
}

export default Instructor_layout;