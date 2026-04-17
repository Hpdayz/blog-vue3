// 格式化日期
import { dayjs } from 'element-plus'
export const formatDate = (date) =>{
  return dayjs(date).format('YYYY-MM-DD hh:mm:ss')
}