<template>
  <div class="w-full min-h-[100vh] relative overflow-hidden bg-[#f8f9fb] dark:bg-[#050505]">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-[40%] -left-[20%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-blue-400/8 via-indigo-400/6 to-purple-400/4 blur-3xl"></div>
      <div class="absolute -bottom-[30%] -right-[20%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-violet-400/6 via-fuchsia-400/4 to-pink-400/3 blur-3xl"></div>
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25eIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djZoLTZ2LTZoNnptMC0zMHY2aC02VjRoNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-60"></div>
    </div>

    <!-- Top Bar -->
    <div class="sticky top-0 left-0 w-full z-[10] px-[48px] max-sm:px-[12px]">
      <div class="w-full h-[60px] mx-auto flex items-center justify-between text-[var(--text-primary)]">
        <a href="/" class="flex items-center gap-2 group">
          <div class="w-[30px] h-[30px] transition-transform duration-300 group-hover:scale-110">
            <RobotAvatar :interactive="false" />
          </div>
          <ScienceClawLogoTextIcon />
        </a>
        <div class="flex items-center">
          <LanguageSelector />
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="relative z-[1] flex flex-col justify-center items-center min-h-[100vh] pt-[20px] pb-[60px] -mt-[60px] max-sm:pt-[80px] max-sm:pb-[80px] max-sm:mt-0 max-sm:min-h-[calc(100vh-60px)] max-sm:justify-start">
      <!-- Logo + Title -->
      <div class="login-header w-full max-w-[720px] pt-[24px] mb-[32px] max-sm:pt-[0px]">
        <div class="flex flex-col items-center gap-[16px]">
          <div class="size-[72px] rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-500/20 max-sm:size-[56px]">
            <RobotAvatar class="w-[44px] h-[44px] max-sm:w-[36px] max-sm:h-[36px]" :interactive="true" />
          </div>
          <h1 class="text-[20px] font-bold text-center text-[var(--text-primary)] max-sm:text-[18px]">
            <span class="brand-text bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-red-500 to-amber-500" style="background-size:200% 100%">研·千易</span>
          </h1>
        </div>
      </div>

      <!-- Notice Card -->
      <div class="login-card w-full max-w-[420px] px-4">
        <div class="bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-black/5 p-6">
          <div class="flex flex-col items-center text-center gap-4">
            <div class="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <svg class="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h2 class="text-lg font-semibold text-[var(--text-primary)] mb-2">登录功能已下线</h2>
              <p class="text-sm text-[var(--text-secondary)]">请返回云上鲁南登录</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScienceClawLogoTextIcon from '@/components/icons/ScienceClawLogoTextIcon.vue'
import RobotAvatar from '@/components/icons/RobotAvatar.vue'
import LanguageSelector from '@/components/LanguageSelector.vue'
</script>

<style scoped>
.login-header {
  animation: fadeInDown 0.5s ease-out;
}
.login-card {
  animation: fadeInUp 0.5s ease-out 0.1s both;
}
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-16px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
.brand-text {
  animation: gradientShift 4s ease-in-out infinite;
}
@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
</style>