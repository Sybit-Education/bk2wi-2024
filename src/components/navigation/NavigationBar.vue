<template>
  <BNavbar toggleable="lg" variant="primary" v-b-color-mode="'dark'">
    <BNavbarBrand href="/">Sportsy</BNavbarBrand>
    <BNavbarToggle target="nav-collapse" />
    <BCollapse id="nav-collapse" is-nav>
      <BNavbarNav>
        <BNavItem href="/" >Home</BNavItem>
      </BNavbarNav>
      <!-- Right aligned nav items -->
      <BNavbarNav class="ms-auto mb-2 mb-lg-0">
        <BNavItem href="/about">Über uns</BNavItem>
        <BNavItem href="/account/create">Create Account</BNavItem>
        <BNavItem href="/impressum">Impressum</BNavItem>
        <BNavItem href="/datenschutz">Datenschutz</BNavItem>
      </BNavbarNav>
    </BCollapse>
  </BNavbar>
</template>

<script lang="ts"></script>
