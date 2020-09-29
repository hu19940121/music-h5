<template>
  <div>
    <van-nav-bar
      :title="$t('leftNav.loginText')"
      :left-text="$t('navigation.goBackText')"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <van-notice-bar mode="closeable">
      {{ $t('tips.loginWay') }}
    </van-notice-bar>
    <van-form @submit="onSubmit" class="margin-top-lg">
      <van-field
        v-model="phone"
        name="phone"
        :label="$t('login.phoneText')"
        :placeholder="$t('login.phonePlaceholder')"
        :rules="[{ required: true, message: $t('login.phonePlaceholder') }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        :label="$t('login.passwordText')"
        :placeholder="$t('login.passwordPlaceholder')"
        :rules="[{ required: true, message: $t('login.passwordPlaceholder') }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          {{$t('login.submitText')}}
        </van-button>

      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      phone: '',
      password: ''
    }
  },
  mounted() {
  },
  methods: {
    ...mapActions({
      login: 'user/login',
      logout: 'user/logout'
    }),
    onSubmit(values) {
      this.login(values).then((res) => {
        this.$router.push({
          path: '/'
        })
      }).catch(err => {
        Toast(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
