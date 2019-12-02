<style lang="scss" rel='stylesheet/scss' src='./problem.scss'></style>
<template>
    <div class="problem_wrap">
        <el-collapse  v-for="(item, index) in problems" :key="index">
            <el-collapse-item :title="item.title" :name="item.name">
                <template slot="title">
                    <span class="number">{{item.id}}</span>  . {{item.title}}
                </template>
                <div class="problem_content">{{item.content}}</div>
            </el-collapse-item>
        </el-collapse>
        <!-- </div> -->
        <div class="page" v-show="count > pageSize">
            <el-pagination
                @current-change='change'
                :current-page='current'
                :page-size='pageSize'
                layout="prev, pager, next"
                :total="count">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import { problem } from '@/services'
    export default {
        data() {
            return {
                current: 1 ,
                count: 1 ,
                pageSize:8 ,
                problems: []
            }
        },
        created() {
            let params = {
                page: this.current - 1,
                size: this.pageSize
            };
            this.problem(params)
        },
        methods: {
            async problem(params) {
                const { status, result, info} = await problem(params)
                if( status != 1 ) {
                    return this.$Message(info, 'error')
                }
                this.problems = result.list;
                if(this.count == 1) {
                    this.count = result.count;
                }
                
            },
            change(val) {
                this.current = val
                let params = {
                    page: this.current - 1,
                    size: this.pageSize
                };
                this.problem(params)
            }
        }
    }
</script>
