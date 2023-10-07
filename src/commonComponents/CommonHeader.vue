<template>
    <div class="header">
        <div class="left-menu">
            <router-link to="/home">
                <!--                TODO 设计logo-->
                <ion-icon name="logo-ionic" class="logo"></ion-icon>
            </router-link>

            <div class="main-nav">
                <ul class="main-nav-list">
                    <li>
                        <router-link to="/home" class="main-nav-link">首页</router-link>
                    </li>
                    <li>
                        <router-link to="/list" class="main-nav-link">清单</router-link>
                    </li>
                    <li>
                        <router-link to="/force" class="main-nav-link">专注</router-link>
                    </li>
                    <li>
                        <router-link to="/analysis" class="main-nav-link">统计</router-link>
                    </li>
                </ul>
            </div>
        </div>

        <div class="right-menu">
<!--            TODO maxLength? 去抖？历史记录 clearable-->
            <el-input v-model="searchContent">
                <template slot="suffix">
                    <span class="el-input__suffix">
                        <span class="el-input__suffix-inner">
                          <i
                                  class="el-icon-search"
                                  @click="handleSearch"
                          />
                        </span>
                    </span>
                </template>
            </el-input>
<!--            TODO 消息数字后端取-->
            <el-badge :value="1" class="message-number">
                <el-button class="message-button" @click="handleMessage">
                    <i class="el-icon-message-solid"></i>
                </el-button>
            </el-badge>

            <el-dropdown class="avatar-container">
                <div class="avatar-wrapper">
                    <!--                    TODO 图片的清晰度-->
                    <img :src="avatar" class="user-avatar" alt="avatar"/>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <router-link to="/user/profile" style="text-decoration: none">
                        <el-dropdown-item>个人中心</el-dropdown-item>
                    </router-link>
                    <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>

export default {
    name: 'CommonHeader',

    data() {
        return {
            // TODO avatar找不到显示图裂，而不是整个都失败？
            avatar: require('../assets/avatar.png'),
            searchContent: '',
        }
    },

    methods: {
        logOut() {

        },
        handleSearch() {

        },
        handleMessage() {

        },
    },

    mounted() {
        const ioniconsESM = document.createElement('script');
        ioniconsESM.type = 'module';
        ioniconsESM.src = 'https://unpkg.com/ionicons@5.4.0/dist/ionicons/ionicons.esm.js';
        document.head.appendChild(ioniconsESM);

        const ioniconsJS = document.createElement('script');
        ioniconsJS.setAttribute('nomodule', '');
        ioniconsJS.src = 'https://unpkg.com/ionicons@5.4.0/dist/ionicons/ionicons.js';
        document.head.appendChild(ioniconsJS);
    }
}
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fdf2e9;

    height: 6.4rem;
    padding: 0 4.8rem;
}

.left-menu {
    display: flex;
    align-items: center;
    gap: 4.8rem;
}

.logo {
    height: 4.8rem;
    width: 4.8rem;
    color: #333;
}

.main-nav-list {
    list-style: none;
    display: flex;
    gap: 4.8rem;
}

.main-nav-link:link,
.main-nav-link:visited {
    text-decoration: none;
    color: #333;
    font-weight: 600;
    font-size: 1.6rem;
    transition: all 0.3s;
}

.main-nav-link:hover,
.main-nav-link:active {
    color: #cf711f;
}

.right-menu {
    display: flex;
    align-items: center;
    gap: 2.4rem;
}

.el-input /deep/ .el-input__inner:hover,
.el-input /deep/ .el-input__inner:focus {
    border-color: #cf711f;
}

.el-input__suffix {
    display: flex;
    align-items: center;
    cursor: pointer;
}

/deep/ .right-menu .el-input__inner {
    border-radius: 1rem;
}

.el-input__suffix:hover {
    color: #cf711f;
}

.message-button {
    border: none;
    background: none;
}

.message-button:hover {
    color: #cf711f;
    background-color: #fdf2e9;
}

.el-icon-message-solid {
    font-size: 2.4rem;
    transition: all 0.3s;
}

/deep/ .el-badge__content.is-fixed {
    top: 1.2rem;
    right: 2.9rem;
}

.avatar-wrapper {
    cursor: pointer;
}

.user-avatar {
    height: 4.4rem;
    width: 4.4rem;
    border-radius: 50%;
}
</style>