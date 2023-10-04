<template>
    <div class="header">
        <div class="left-menu">
            <a href="#">
                <img class="logo" alt="time-logo" src="../assets/logo.png"/>
            </a>

            <div class="main-nav">
                <ul class="main-nav-list">
                    <li><a class="main-nav-link" href="#">首页</a></li>
                    <li><a class="main-nav-link" href="#">清单</a></li>
                    <li><a class="main-nav-link" href="#">专注</a></li>
                    <li><a class="main-nav-link" href="#">统计</a></li>
                </ul>
            </div>
        </div>

        <div class="right-menu">
            <button class="search-button">
                <ion-icon class="search-button-icon" name="search-outline"></ion-icon>
<!--                <i class="el-icon-search"></i>-->
            </button>
            <button class="search-button">
                <ion-icon class="search-button-icon"  name="mail-outline"></ion-icon>
            </button>
            <el-button type="primary"
                       icon="el-icon-search">查询</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CommonHeader',

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

    height: 9.6rem;
    padding: 0 4.8rem;
}

.left-menu {
    display: flex;
    align-items: center;
    gap: 4.8rem;
}

.logo {
    height: 4.4rem;
    width: 4.4rem;
    border-radius: 50%;
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
    gap: 4.8rem;
}

.search-button {
    border: none;
    background: none;
    cursor: pointer;
}

.search-button-icon {
    height: 2.4rem;
    width: 2.4rem;
}
</style>