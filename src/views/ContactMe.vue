<script setup>
import { ref } from "vue";

const form = ref({
  name: '',
  email: '',
  message: '',
})

const sendEmail = () => {
  const subject = encodeURIComponent(`Portfolio — ${form.value.name}`)
  const body = encodeURIComponent(`${form.value.message}\n\n— ${form.value.name} (${form.value.email})`)
  window.open(`mailto:j.grace.g.lopez@gmail.com?subject=${subject}&body=${body}`, '_blank')
}
</script>

<template>
  <div class="container">
    <div class="container header h1">
      {{ $t('navbar.contact') }}
    </div>

    <p class="tagline">{{ $t('contact.tagline') }}</p>

    <div class="contact-layout">
      <!-- Form -->
      <div class="contact-form-wrapper" style="max-width: 560px; width: 100%; margin: 0 auto;">
        <form class="contact-form" @submit.prevent="sendEmail">
          <div class="field-group">
            <label class="field-label">{{ $t('contact.form.name') }}</label>
            <input
              v-model="form.name"
              type="text"
              class="field-input"
              required
            />
          </div>
          <div class="field-group">
            <label class="field-label">{{ $t('contact.form.email') }}</label>
            <input
              v-model="form.email"
              type="email"
              class="field-input"
              required
            />
          </div>
          <div class="field-group">
            <label class="field-label">{{ $t('contact.form.message') }}</label>
            <textarea
              v-model="form.message"
              class="field-input field-textarea"
              rows="5"
              required
            />
          </div>
          <button type="submit" class="send-btn">
            <v-icon icon="mdi-send" size="16" style="margin-right: 8px;" />
            {{ $t('contact.form.send') }}
          </button>
        </form>
      </div>

      <!-- Social links -->
      <div class="social-wrapper">
        <a href="mailto:j.grace.g.lopez@gmail.com" class="social-link">
          <v-icon icon="mdi-email-outline" size="22" color="#c4a055" />
          <span>j.grace.g.lopez@gmail.com</span>
        </a>
        <a href="https://github.com/EnigmaJoy" target="_blank" rel="noopener noreferrer" class="social-link">
          <v-icon icon="mdi-github" size="22" color="#c4a055" />
          <span>github.com/EnigmaJoy</span>
        </a>
        <a href="https://www.linkedin.com/in/j-grace-g-lopez/" target="_blank" rel="noopener noreferrer" class="social-link">
          <v-icon icon="mdi-linkedin" size="22" color="#c4a055" />
          <span>j-grace-g-lopez</span>
        </a>
        <div class="social-link location">
          <v-icon icon="mdi-map-marker-outline" size="22" color="#c4a055" />
          <span>{{ $t('contact.location') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.h1 {
  flex-direction: column;
  align-items: center;
  color: #c4a055;
}

.tagline {
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  color: #c8b898;
  font-style: italic;
  text-align: center;
  margin: 0.5rem 0 2.5rem;
  line-height: 1.7;
  opacity: 0.85;
}

.contact-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding-bottom: 3rem;
}

.social-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0 2.5rem;
  padding: 0.5rem 0;
  max-width: 560px;
  width: 100%;
}

/* ── Mobile ≤ 480px ── */
@media (max-width: 480px) {
  .tagline {
    font-size: 0.88rem;
    margin-bottom: 1.5rem;
  }

  .contact-form-wrapper {
    padding: 1.2rem;
  }

  .field-input {
    padding: 0.85rem 0.9rem;
    font-size: 1rem;
  }

  .send-btn {
    width: 100%;
    padding: 0.85rem;
  }

  .social-link {
    font-size: 0.88rem;
    padding: 0.8rem 0;
  }
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.contact-form-wrapper {
  padding: 1.8rem;
  border-radius: 16px;
  background: linear-gradient(to bottom right, rgba(44, 33, 48, 0.5), rgba(139, 107, 54, 0.15));
  border: 1px solid rgba(139, 107, 54, 0.2);
  backdrop-filter: blur(20px) brightness(0.95);
  -webkit-backdrop-filter: blur(20px) brightness(0.95);
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.field-label {
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #d4b870;
  opacity: 0.8;
}

.field-input {
  background: rgba(44, 33, 48, 0.4);
  border: 1px solid rgba(139, 107, 54, 0.25);
  border-radius: 10px;
  padding: 0.75rem 1rem;
  color: #f0e6d8;
  font-size: 0.95rem;
  outline: none;
  font-family: inherit;
  transition: border-color 0.2s ease;
  resize: none;
}

.field-input:focus {
  border-color: rgba(196, 160, 85, 0.6);
}

.field-textarea {
  min-height: 120px;
}

.send-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  padding: 0.7rem 2rem;
  border-radius: 30px;
  background: linear-gradient(to right, rgba(196, 160, 85, 0.2), rgba(196, 122, 48, 0.2));
  border: 1px solid rgba(196, 160, 85, 0.4);
  color: #d4b870;
  font-size: 0.9rem;
  letter-spacing: 0.06em;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.2s ease, box-shadow 0.2s ease;
}

.send-btn:hover {
  background: linear-gradient(to right, rgba(196, 160, 85, 0.35), rgba(196, 122, 48, 0.35));
  box-shadow: 0 4px 20px rgba(196, 160, 85, 0.2);
}


.social-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: #c8b898;
  font-size: 0.95rem;
  transition: color 0.2s ease;
  padding: 0.6rem 0;
  border-bottom: 1px solid rgba(139, 107, 54, 0.1);
}

.social-link:hover {
  color: #d4b870;
}

.social-link.location {
  cursor: default;
}
</style>