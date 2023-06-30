<script setup>
import { useLayout } from '@/layout/composables/layout';
import Request from '@/views/utilities/httpConfig/Request.js';
import { ref, computed } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import { Message } from '@/views/utilities/Message/Message';
const msg = new Message();
const { layoutConfig } = useLayout();
const submitted = ref(false);
const userName = ref('');
const password = ref('');
const confirmPassword = ref('');
// 标记是否校验通过
const validateUserNameState = ref(false);
const validatePasswordState = ref(false);
// 加载状态
const loading = ref(false);

const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

const onSubmit = computed(() => {
    return async () => {
        submitted.value = true;
        loading.value = true;
        validatePassword();
        validateUserName();
        if (validatePasswordState.value && validateUserNameState.value && password.value === confirmPassword.value) {
            const response = await Request.post('User/Register', {
                userName: userName.value,
                password: password.value,
                confirmPassword: confirmPassword.value
            });
            if (response) {
                msg.Success('注册成功', '即将跳转到登录页面');
            } else {
                msg.Error('注册失败', '请检查用户名或密码是否正确');
            }
        }

        loading.value = false;
    };
});
// 校验密码password是否符合规则 2至24位以字母开头，包含数字、字母或者下划线
const validatePassword = () => {
    if (!password.value) {
        validatePasswordState.value = false;
    }
    validatePasswordState.value = /^[a-zA-Z]\w{2,24}$/.test(password.value);
};
// 检查用户名userName是否校验通过，2至24位数字、字母或者下划线
const validateUserName = () => {
    if (!userName.value) {
        validateUserNameState.value = false;
    }
    validateUserNameState.value = /^\w{2,24}$/.test(userName.value);
};
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img src="/demo/images/login/avatar.png" alt="Image" height="56" class="mb-3" />
                        <div class="text-900 text-3xl font-medium mb-3">Register !</div>
                        <span class="text-600 font-medium">Sign Up to continue</span>
                    </div>
                    <div class="md:w-30rem">
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">账号</label>
                        <InputText id="userName" type="text" placeholder="2至24位数字、字母或者下划线" autofocus class="w-full" :class="{ 'p-invalid': (submitted && !userName) || !validateUserNameState }" style="padding: 1rem" v-model="userName" />
                        <small class="p-invalid p-error" v-if="(submitted && !userName) || !validateUserNameState">2至24位数字、字母或者下划线</small>
                        <label for="password1" class="block text-900 font-medium text-xl mb-2 mt-3">密码</label>
                        <Password
                            id="password1"
                            v-model="password"
                            onwaiting=""
                            placeholder="2至24位以字母开头，包含数字、字母或者下划线"
                            :toggleMask="true"
                            class="w-full"
                            :class="{ 'p-invalid': (submitted && !password) || !validatePasswordState }"
                            promptLabel="请输入密码" 
                            weakLabel="简单" 
                            mediumLabel="中等" 
                            strongLabel="复杂"
                            inputClass="w-full"
                            inputStyle="padding:1rem"
                            :feedback="false"
                        ></Password>
                        <small class="p-invalid p-error" v-if="(submitted && !password) || !validatePasswordState">2至24位以字母开头，包含数字、字母或者下划线</small>

                        <label for="password2" class="block text-900 font-medium text-xl mb-2 mt-3">确认密码</label>
                        <Password
                            id="password2"
                            v-model="confirmPassword"
                            placeholder=""
                            :toggleMask="true"
                            class="w-full"
                            :class="{ 'p-invalid': confirmPassword !== password }"
                            inputClass="w-full"
                            inputStyle="padding:1rem"
                            :feedback="false"
                        ></Password>
                        <small class="p-invalid p-error" v-if="submitted && confirmPassword !== password">输入的密码不一致</small>

                        <Button label="登录" class="w-full p-3 text-xl mt-3" :loading="loading" @click="onSubmit"></Button>
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
