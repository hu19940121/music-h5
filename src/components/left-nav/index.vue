<template>
  <div>
    <van-popup v-model="show" position="left" :style="{ width: '60%',height:'100%' }">
      <div class="text-center padding-top">
        <div v-if="token">
          <img  class="avatar" :src="userInfo.avatarUrl" alt="">
          <p> {{ userInfo.nickname }} </p>
          <van-button size="mini" @click="lgout" round type="primary">{{ $t('leftNav.logoutText') }}</van-button>
        </div>
        <router-link  v-else to="/login">
          <svg-icon  className="nologin" icon-class="nologin"   />
          <p class="margin-tb-xs">
            <van-button size="mini" round type="primary">{{ $t('leftNav.loginText') }}</van-button>
          </p>
        </router-link>

        <!-- 语言选择-->
        <van-field
          readonly
          clickable
          :value="languageShow"
          name="picker"
          :label="$t('leftNav.languageText')"
          placeholder="点击选择语言"
          @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom" get-container="body">
          <van-picker
            show-toolbar
            :columns="languageColumns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          >
          </van-picker>
        </van-popup>
        <!-- 主题选择 -->
        <van-field
          readonly
          clickable
          name="picker"
          :value="themeValue"
          :label="$t('leftNav.themeText')"
          placeholder=""
          @click="showThemePickerMethod"
        />
        <van-popup v-model="showThemePicker" position="bottom" get-container="body">
          <van-picker
            show-toolbar
            :columns="themeColumns"
            @confirm="onThemeConfirm"
            @cancel="showThemePicker = false"
          />
        </van-popup>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Notify, Toast } from 'vant'
import { chooseLangueList } from '@/i18n/i18nOptions'
import { mapActions } from 'vuex'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: this.value,
      login: false,
      themeValue: '',
      themeColumns: ['绿', '红', '黄'],
      showPicker: false,
      showThemePicker: false
    }
  },
  computed: {
    token() {
      return this.$store.state.user.token
    },
    userInfo() {
      return this.$store.state.user.userInfo
    },
    language() {
      return this.$store.state.app.language
    },
    languageShow() {
      const languageList = chooseLangueList[this.$i18n.locale]
      return languageList.length > 0 && languageList.find((item) => item.value === this.$store.state.app.language).text
    },
    languageColumns() {
      return chooseLangueList[this.$i18n.locale]
    }
  },
  watch: {
    show(value) {
      this.$emit('input', value)
    },
    value(value) {
      this.show = value
    }
  },
  methods: {
    ...mapActions({
      logout: 'user/logout'
    }),
    showThemePickerMethod() {
      Toast(this.$t('tips.undo'))
    },
    onConfirm(obj) {
      const v = obj.value
      this.$i18n.locale = v
      this.$store.dispatch('app/setLanguage', v)
      Notify(this.$t('tips.changeLanuageText'))
      this.languageValue = v
      this.showPicker = false
    },
    onThemeConfirm(value) {
      this.themeValue = value
      this.showThemePicker = false
    },
    lgout() {
      this.logout().then(() => {
        this.show = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: red;
}
.nologin {
  font-size: 50px;
}
</style>
