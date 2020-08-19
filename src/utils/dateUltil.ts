
/**
 * 
 * @param date 
 * @param format 
 * @param setTimeZone có set timzone ko. mặc định nếu lấy dữ liệu từ server về thì phải set timezone, còn tại máy thì không cần
 */
export function formatDate(date: any, format?: string, setTimeZone?: boolean) {
    if (!format)
        format = 'dd/MM/yyyy hh:mm';
    let dateObj = new Date(date);
    if (setTimeZone) {
        const timeZone = (new Date().getTimezoneOffset()) / 60;
        dateObj.setHours(dateObj.getHours() + timeZone)
    }
    let year = dateObj.getFullYear();
    if (year == 1 || year == 1970)
        return '';
    let day = `0${dateObj.getDate()}`.substr(-2);
    let month = `0${dateObj.getMonth() + 1}`.substr(-2);
    let hours = `0${dateObj.getHours()}`.substr(-2);
    let minutes = `0${dateObj.getMinutes()}`.substr(-2);
    let seconds = `0${dateObj.getSeconds()}`.substr(-2);
    let dateFormat = format.replace('yyyy', year.toString());
    dateFormat = dateFormat.replace('MM', month);
    dateFormat = dateFormat.replace('dd', day);
    dateFormat = dateFormat.replace('hh', hours);
    dateFormat = dateFormat.replace('mm', minutes);
    dateFormat = dateFormat.replace('ss', seconds);

    return dateFormat;
}
export function getMonday() {
    let currentDate = new Date();
    let day = currentDate.getDay(),
        diff = currentDate.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(currentDate.setDate(diff));
}
export function getSunday() {
    let monday = getMonday();
    return new Date(monday.setDate(monday.getDate() + 6));
}
export function firstWeekDay() {
    var date = new Date();
    var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
}

/**
 * Lấy ngày cuối tuần
 * @param numb 
 */
export function dayOfWeekend(numb: number) {
    var firstDate = firstWeekDay();
    return firstDate.setDate(firstDate.getDate() + numb);
}

/**
 * Lấy ngày cách ngày hiện tại một khoảng
 * @param numb 
 */
export function dayOfWeek(numb: number) {
    var date = new Date();
    var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    diff = diff + numb - 1;
    return new Date(date.setDate(diff));
}
export function convertDate(inputFormat: any) {
    function pad(s: any) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
}
export function formatAMPM(date: any) {
    const timeZone = (new Date().getTimezoneOffset()) / 60;
    var newDate = new Date(date)
    // var newDate = new Date(date);

    // newDate.setHours(newDate.getHours() + timeZone);
    var hours = newDate.getHours();
    var minutes = newDate.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    var hoursResult = hours ? ('0' + hours).substr(-2) : 12; // the hour '0' should be '12'
    var minutesResult = ('0' + minutes).substr(-2);
    var strTime = hoursResult + ':' + minutesResult + ':00 ' + ampm;
    var stringDate = convertDate(newDate);
    return stringDate + ' ' + strTime;
}
export function TimeStamp ()
{
   return  Math.round(new Date().getTime()/1000);

}