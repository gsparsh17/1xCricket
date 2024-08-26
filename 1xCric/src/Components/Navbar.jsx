import React from 'react';
import { useLocation } from 'react-router-dom';
import "./Navbar.css"


function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  return (
    <div className='w-full up shadow-[4px_4px_7px_rgba(0,0,0,0.5)]'>
        {/* <div id='myDiv' className="bg-zinc-900 z-10 fixed flex flex-wrap gap-5 justify-between px-12 py-3.5 w-full  max-md:px-5 max-md:max-w-full drop-shadow-[2px_5px_5px_rgba(0,0,0,0.5)]">
    <div className="my-auto text-2xl text-white">
    <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/270b06e9db1b9f6549ec07851c30654e6ab9dee8a05c10f4703ea3bf18467772?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc"
            id="icon" className="object-contain shrink-0 self-start max-w-full aspect-[10] w-[250px]"
          />
    </div>
    <div className="nav flex flex-wrap gap-5 text-sm text-white">
      <div className="flex flex-auto gap-8 items-start my-auto font-semibold text-[16px]">
        <button className='navigation-buttons w-16 active'><a href="/">Home</a></button>
        <button className='navigation-buttons w-16'><a href="News">News</a></button>
        <button className='navigation-buttons w-16'><a href="Schedule">Schedule</a></button>
        <div>
        <button className='w-32 navigation-buttons'><span><img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a58d72dfa12e9ac696846ae0d28d6027da1a4b5e8e2060220872f4ae1cff542e?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc"
            className="object-contain shrink-0 aspect-square w-[20px] absolute"
          /></span>
          <a className='tab' id="tab" onClick={
            function Drop(){
              var drop = document.getElementById('dropdown');
              if (drop.style.display === 'none' || drop.style.display === '') {
                  drop.style.display = 'block'; 
              } else {
                  drop.style.display = 'none'; 
              }
            }}>Categories</a>
          </button>
          <div id="dropdown" class="absolute z-10 mt-8 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
    <div class="" role="none">
      <a href="#" class="block px-4 hover:text-sky-400 hover:bg-zinc-900 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-0">News</a>
      <a href="#" class="block px-4 hover:text-sky-400 hover:bg-zinc-900 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-1">Archives</a>
    </div>
    <div class="" role="none">
      <a href="#" class="block px-4 hover:text-sky-400 hover:bg-zinc-900 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-2">Cricket</a>
      <a href="#" class="block px-4 hover:text-sky-400 hover:bg-zinc-900 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-3">Featured</a>
    </div>
    <div class="" role="none">
      <a href="#" class="block px-4 hover:text-sky-400 hover:bg-zinc-900 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-4">Latest News</a>
      <a href="#" class="block px-4 hover:text-sky-400 hover:bg-zinc-900 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-5">Betting</a>
    </div>
    <div class="" role="none">
      <a href="#" class="block px-4 hover:text-sky-400 hover:bg-zinc-900 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-6">Fantasy Cricket</a>
    </div>
  </div>
          </div>
        <button className='navigation-buttons w-16'><a href="About">About</a></button>
      </div>
      <div className="flex flex-auto gap-3 px-3 py-2 rounded-3xl">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5fbe9016ca322e0b5bc1c12faf170c4ce1075ced7f40d590322566daecb4d0ca?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc"
          className="object-contain shrink-0 w-6 aspect-square"
        />
        <input type="text" placeholder='Search...' className='w-36 bg-transparent p-2 rounded-xl' />
      </div>
    </div>
  </div> */}
  <div id='myDiv' class="bg-zinc-900 z-10 fixed flex justify-between items-center px-12 py-3.5 w-full drop-shadow-[2px_5px_5px_rgba(0,0,0,0.5)] max-md:px-5">
    <div class="my-auto text-2xl text-white">
    {!isHomePage && (
        <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/270b06e9db1b9f6549ec07851c30654e6ab9dee8a05c10f4703ea3bf18467772?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc"
            id="icon" 
            class="object-contain shrink-0 self-start max-w-full w-60 aspect-auto max-md:block"
        />
    )}
    {isHomePage && (
        <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/270b06e9db1b9f6549ec07851c30654e6ab9dee8a05c10f4703ea3bf18467772?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc"
            id="icon" 
            class="object-contain shrink-0 self-start max-w-full w-60 aspect-auto hidden max-md:block"
        />
    )}
    </div>
    
    <div class="hidden max-md:block">
        <button id="menu-button" class="text-white focus:outline-none" onClick={() => {
          const menuButton = document.getElementById('menu-button');
          const sidebar = document.getElementById('sidebar');
          const overlay = document.getElementById('overlay');
    if (sidebar.style.left === '0px') {
        sidebar.style.left = '-100%';
        overlay.classList.add('hidden');
    } else {
        sidebar.style.left = '0px';
        overlay.classList.remove('hidden');
    }
}}>
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
        </button>
    </div>
    
    <div class="flex flex-auto gap-12 items-center justify-end my-auto font-semibold text-[16px] text-white max-md:hidden">
        <button class='navigation-buttons'><a href="/">Home</a></button>
        <button class='navigation-buttons'><a href="/News">News</a></button>
        <button class='navigation-buttons'><a href="/Schedule">Schedule</a></button>
        <div class="relative">
            <button class='navigation-buttons flex items-center justify-between'>
                <span><a className='tab' id="tab" onClick={
            function Drop(){
              var drop = document.getElementById('dropdown');
              if (drop.style.display === 'none' || drop.style.display === '') {
                  drop.style.display = 'block'; 
              } else {
                  drop.style.display = 'none'; 
              }
            }}>Categories</a></span>
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/a58d72dfa12e9ac696846ae0d28d6027da1a4b5e8e2060220872f4ae1cff542e?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc"
                    class="object-contain w-[20px] ml-2"
                />
            </button>
          
            <div id="dropdown" class="absolute z-10 mt-4 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                <div role="none">
                    <a href="/News" class="block px-4 py-2 text-sm text-gray-700 hover:text-sky-400 hover:bg-zinc-900" role="menuitem">News</a>
                    <a href="/Category/Archive" class="block px-4 py-2 text-sm text-gray-700 hover:text-sky-400 hover:bg-zinc-900" role="menuitem">Archives</a>
                </div>
                <div role="none">
                    <a href="/Category/Cricket" class="block px-4 py-2 text-sm text-gray-700 hover:text-sky-400 hover:bg-zinc-900" role="menuitem">Cricket</a>
                    <a href="/Category/Fantasy Cricket" class="block px-4 py-2 text-sm text-gray-700 hover:text-sky-400 hover:bg-zinc-900" role="menuitem">Fantasy Cricket</a>
                </div>
            </div>
        </div>
        <button class='navigation-buttons'><a href="About">About</a></button>
        <div class="flex gap-3 px-3 py-2 rounded-3xl">
            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5fbe9016ca322e0b5bc1c12faf170c4ce1075ced7f40d590322566daecb4d0ca?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc"
                class="object-contain shrink-0 w-6 aspect-square"
            />
            <input type="text" placeholder='Search...' class='w-36 bg-transparent p-2 rounded-xl' />
        </div>
    </div>
</div>

<div id="sidebar" class="fixed top-0 left-[-100%] z-20 w-[250px] h-full bg-zinc-900 text-white transition-all duration-300 max-md:block hidden">
    <div class="flex flex-col gap-5 p-5">
        <button class='navigation-buttons'><a href="/">Home</a></button>
        <button class='navigation-buttons'><a href="News">News</a></button>
        <button class='navigation-buttons'><a href="Schedule">Schedule</a></button>
        <button class='navigation-buttons'><a href="Categories">Categories</a></button>
        <button class='navigation-buttons'><a href="About">About</a></button>
        <div class="flex gap-3 px-3 py-2 rounded-3xl">
            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5fbe9016ca322e0b5bc1c12faf170c4ce1075ced7f40d590322566daecb4d0ca?apiKey=6beafd8d1b514e6ebc76a09543c68ffc&&apiKey=6beafd8d1b514e6ebc76a09543c68ffc"
                class="object-contain shrink-0 w-6 aspect-square"
            />
            <input type="text" placeholder='Search...' class='w-full bg-transparent p-2 rounded-xl' />
        </div>
    </div>
</div>

<div id="overlay" class="fixed inset-0 bg-black opacity-50 hidden"onClick={() => {
    const menuButton = document.getElementById('menu-button');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.style.left = '-100%';
    overlay.classList.add('hidden');
}}></div>

  </div>
  )
}

export default Navbar