<script setup>
import { useLayout } from '@/layout/composables/layout';
import { HttpClient } from '@/views/utilities/httpConfig/HttpClient.ts';
import { ref, computed, onMounted } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import { Message } from '@/views/utilities/Message/Message';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const httpClient = new HttpClient();
const { layoutConfig } = useLayout();
const email = ref('');
const password = ref('');
const checked = ref(false);

onMounted(() => {
    console.log('111');
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    Message.Error('注册失败', '请检查用户名或密码是否正确');
});

const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

const onSubmit = computed(() => {
    return async () => {
        const data = {
            email: email.value,
            password: password.value,
            remember: checked.value
        };
        const response = await httpClient.post('/api/auth/login', data);
        if (response.status === 200) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            window.location.href = '/';
        }
    };
});
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <Toast />
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img src="/demo/images/login/avatar.png" alt="Image" height="56" class="mb-3" />
                        <div class="text-900 text-3xl font-medium mb-3">Welcome!</div>
                        <span class="text-600 font-medium">Sign in to continue</span>
                    </div>
                    <div>
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">账号</label>
                        <InputText id="email1" type="text" placeholder="" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="email" />

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">密码</label>
                        <Password id="password1" v-model="password" placeholder="" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem" :feedback="false"></Password>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox v-model="checked" id="remember1" binary class="mr-2"></Checkbox>
                                <label for="remember1">记住密码</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">忘记密码？</a>
                        </div>
                        <Button label="登录" class="w-full p-3 text-xl" @click="onSubmit"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
