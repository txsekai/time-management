<template>
    <el-container>
        <common-header/>
        <el-main class="section-main">
            <div class="container grid">
                <el-card class="card">
                    <div id="oneDayFocusTime" style="width: 60rem; height: 30rem"></div>
<!--                    TODO show more button && chart label-->
                </el-card>

                <el-card class="card">
                    <!--                        TODO 合计总专注时间-->
                    <el-table
                        :data="focusOnRecordingData"
                        show-summary
                        style="width: 100%"
                    >
                        <!--                        TODO 想在第一列放专注类型的标签，标签和数据一样从数据库取-->
                        <el-table-column label="已完成记录">
                            <template slot-scope="scope">
                                <i class="el-icon-alarm-clock"></i>
                                <span style="margin-left: 1rem">{{ scope.row.focusType}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="timeSlot"></el-table-column>
                        <el-table-column prop="time"></el-table-column>
                        <el-table-column>
                            <template slot="header">
                                <el-date-picker
                                    v-model="oneDayTotalTime"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    size="mini"
                                ></el-date-picker>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>

<!--                TODO 日历待办事项联动-->
                <el-card class="card calendar-card">
                    <div class="calendarFlex">
                        <el-calendar class="calendar-item" v-model="calendarDate">

                        </el-calendar>

                        <el-table
                            class="to-do-detail"
                            :data="toDoData"
                        >
                            <el-table-column label="待办事项">
                                <template slot-scope="scope">
                                    <i class="el-icon-alarm-clock"></i>
                                    <span style="margin-left: 1rem">{{ scope.row.toDoType}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="timeSlotDoing"></el-table-column>
                            <el-table-column prop="timeDoing"></el-table-column>
                            <el-table-column prop="priority">
                                <template slot-scope="scope">
                                    <div>
                                        <i v-for="count in scope.row.priority" :key="count" class="el-icon-star-on"></i>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>

                </el-card>
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
                timeSlot: '21:00~22:30',
                time: '1.5小时'
            }
            ],
            oneDayTotalTime: new Date(),
            calendarDate: new Date(),
            toDoData: [
                {
                    toDoType: '拍摄',
                    timeSlotDoing: '20:00~21:00',
                    timeDoing: '1小时',
                    priority: 2
                },{
                    toDoType: '读书',
                    timeSlotDoing: '21:00~22:42',
                    timeDoing: '1.42小时',
                    priority: 3
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
                        data: [23, 24, 18, 25, 27, 28, 25],
                        color: "#cf711f"
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
    padding: 2.4rem 0;
}

.container {
    padding: 0 3.6rem;
    margin: 0 auto;
}

.grid {
    display: grid;
    column-gap: 5.6rem;
    row-gap: 1.6rem;

    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto auto;
}

.card {
    border-radius: 11px;
}



/deep/ .el-table thead {
    color: #cf711f;
}

.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 13rem;
}

.calendar-card {
    grid-column: 1 / -1;
}

.calendarFlex {
    display: flex;
    gap: 2.4rem;
}

.calendar-item {
    width: 56rem;
}

/deep/ .el-calendar__header {
    border-bottom: 0;
    padding: 1.2rem 2rem 0.6rem;
}

/deep/ .el-calendar__body {
    padding: 0.6rem 2rem 3.5rem;
}

.to-do-detail {

}
</style>