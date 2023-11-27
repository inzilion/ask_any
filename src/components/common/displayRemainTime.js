export default function displayRemainTime({totalSeconds}) {
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    var seconds = totalSeconds - (hours * 3600) - (minutes * 60);

    // 결과를 문자열로 변환
    var result = hours + "시간 " + minutes + "분 " + seconds + "초";
    return (
        <>
            {result}
        </>
    );
}