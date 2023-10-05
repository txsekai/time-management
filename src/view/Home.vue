<template>
    <el-container>
        <common-header/>
        <el-main class="section-main">
            <div class="container grid">
                <div class="card">
                    <div id="oneDayFocusTime" style="width: 60rem; height: 30rem"></div>
<!--                    TODO show more button && chart label-->
                </div>

                <div class="card">
                    <el-table
                        :data="focusOnRecordingData"
                        show-summary
                        style="width: 100%"
                        :show-header="false"
                    >
                        <!--                        TODO 想在第一列放专注类型的图标，图标和数据一样从数据库取-->
                        <el-table-column prop="focusType"></el-table-column>
                        <el-table-column prop="timeSlot"></el-table-column>
                        <el-table-column prop="time"></el-table-column>
                    </el-table>
                </div>

                <div style="background-color: pink"></div>

                <div style="background-color: blue"></div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import CommonHeader from '../components/CommonHeader.vue'
import * as echarts from "echarts";

export default {
    name: 'Home',

    components: {
        CommonHeader,
    },

    data() {
        return {
            focusOnRecordingData: [{
                focusType: '运动',
                timeSlot: '20:00~21:00',
                time: '1小时'
            },{
                focusType: '学习',
                timeSlot: '21:00~22:00',
                time: '1小时'
            }
            ],
        }
    },

    mounted() {
        this.oneDayChartRender()
    },

    methods: {
        oneDayChartRender() {
            const chart = echarts.init(document.getElementById('oneDayFocusTime'))
            // TODO 数据从后端取
            const options = {
                xAxis: {
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {},
                series: [
                    {
                        type: 'bar',
                        data: [23, 24, 18, 25, 27, 28, 25]
                    }
                ]
            }

            chart.setOption(options)
        },
    }
}
</script>

<style scoped>
.el-container {
    flex-direction: column;
}

.section-main {
    padding: 4.8rem 0;
}

.container {
    max-width: 120rem;
    padding: 0 1.6rem;
    margin: 0 auto;
}

.grid {
    display: grid;
    column-gap: 6.4rem;
    row-gap: 3.2rem;

    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
}

.card {
    box-shadow: 0 2.4rem 4.8rem rgba(0, 0, 0, 0.075);
    border-radius: 11px;
    transition: all 0.4s;
}

.card:hover {
    transform: translateY(-1.2rem);
    box-shadow: 0 0 6.4rem rgba(0, 0, 0, 0.06);;
}
</style>