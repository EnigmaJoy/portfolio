<!-- eslint-disable-next-line -->

<template>
  <div class="hello container page-bg-" id="main">
    <NavBar id="main" class="navbar"/>
    <div class="logo-wrap">
<!--      <span class="ghost-integral" aria-hidden="true">∫</span>-->

      <div class="formula-row">
        <span class="formula-initials">JG</span><span class="formula-sup">2</span><span class="formula-initials">L</span>
<!--        <span class="formula-dx">dx</span>
        <span class="formula-eq">=</span>-->
<!--        <span class="formula-name">Joselyn Grace<br>Gordillo Lopez</span>-->
      </div>

      <p class="formula-fullname">Joselyn Grace<br>Gordillo Lopez</p>

      <p class="formula-tagline">the integral of every gaze, evaluated from curiosity to craft</p>
    </div>
  </div>
</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Prata&display=swap');

.container {
  display: flex;
  flex-direction: column;
}

.logo-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  gap: 1.8rem;
  overflow: visible;
}

/* Ghost integral behind the formula */
.ghost-integral {
  position: absolute;
  left: clamp(2%, 8%, 12%);
  top: 50%;
  transform: translateY(-58%);
  font-family: 'Prata', serif;
  font-size: clamp(12rem, 22vw, 20rem);
  line-height: 1.2;
  background: linear-gradient(135deg, rgba(232, 168, 85, 0.1), rgba(196, 122, 48, 0.05));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  pointer-events: none;
  user-select: none;
}

.formula-row {
  position: relative;
  display: flex;
  align-items: center;
  gap: clamp(0.6rem, 2vw, 1.4rem);
  flex-wrap: wrap;
  justify-content: center;
  min-height: 100px;
}

.formula-initials {
  font-family: 'Prata', serif;
  font-size: clamp(2.5rem, 7vw, 5.5rem);
  font-style: italic;
  line-height: 1.3;
  padding: 0.15em 0.05em;
  align-self: center;
  background: linear-gradient(135deg, #e8a855 0%, #c47a30 45%, #d4944a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 4px 16px rgba(196, 122, 48, 0.35));
}

.formula-sup {
  font-family: 'Prata', serif;
  font-size: clamp(0.9rem, 2vw, 1.8rem);
  font-style: italic;
  position: relative;
  top: -0.6em;
  color: #e8a855;
}

.formula-dx {
  font-family: 'Prata', serif;
  font-size: clamp(1.6rem, 4vw, 3.2rem);
  font-style: italic;
  background: linear-gradient(135deg, #f0e6d8 0%, #c8b898 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  opacity: 0.75;
}

.formula-eq {
  font-family: 'Prata', serif;
  font-size: clamp(2rem, 5vw, 4rem);
  color: #a89b8c;
  opacity: 0.6;
  line-height: 1;
}

.formula-name {
  font-family: 'Prata', serif;
  font-size: clamp(0.85rem, 2.2vw, 1.5rem);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  text-align: left;
  line-height: 1.5;
  background: linear-gradient(135deg, #f0e6d8 0%, #c8b898 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Tagline */
.formula-tagline {
  font-family: 'Prata', serif;
  font-style: italic;
  font-size: clamp(0.75rem, 1.5vw, 1rem);
  color: #a89b8c;
  letter-spacing: 0.04em;
  opacity: 0.65;
  margin: 0;
  position: relative;
}

.formula-tagline::before {
  content: '';
  display: block;
  width: 40px;
  height: 1px;
  background: rgba(196, 122, 48, 0.3);
  margin: 0 auto 1rem;
}

/* Fullname: nascosto su desktop, visibile solo mobile ── */
.formula-fullname {
  display: none;
}

/* ── Mobile ≤ 480px ── */
@media (max-width: 480px) {
  .logo-wrap {
    height: 90vh;
    gap: 1.5rem;
  }

  .formula-row {
    gap: 0.4rem;
    padding: 0 1rem;
  }

  .formula-initials {
    font-size: clamp(7rem, 15vw, 5.5rem);
  }

  .formula-sup {
    font-size: clamp(1rem, 5vw, 1.8rem);
  }

  .formula-fullname {
    display: block;
    font-family: 'Prata', serif;
    font-size: clamp(0.8rem, 4vw, 1.1rem);
    text-transform: uppercase;
    letter-spacing: 0.14em;
    text-align: center;
    line-height: 1.6;
    color: #c8b898;
    margin: 0;
    opacity: 0.85;
  }

  .formula-tagline {
    font-size: 0.88rem;
    padding: 0 2rem;
    text-align: center;
  }
}

/* ── Tablet 481–768px ── */
@media (min-width: 481px) and (max-width: 768px) {
  .ghost-integral {
    font-size: clamp(10rem, 18vw, 14rem);
  }

  .formula-tagline {
    font-size: 0.85rem;
  }

  .formula-initials {
    font-size: clamp(7rem, 15vw, 5.5rem);
  }

  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(1200px, 1fr));
    grid-gap: 1rem;
  }
}
/* ── Tablet 769–1024px ── */
@media (min-width: 769px) and (max-width: 1024px) {
  .ghost-integral {
    font-size: clamp(10rem, 18vw, 14rem);
  }

  .formula-tagline {
    font-size: 0.85rem;
  }

  .formula-initials {
    font-size: clamp(7rem, 15vw, 5.5rem);
  }

  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(1200px, 1fr));
    grid-gap: 1rem;
  }
}
</style>

<script setup lang="js">
import NavBar from "@/components/layout/NavBar.vue";
</script>
