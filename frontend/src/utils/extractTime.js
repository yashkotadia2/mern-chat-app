// export function extractTime(dateString) {
// 	const date = new Date(dateString);
// 	const hours = padZero(date.getHours());
// 	const minutes = padZero(date.getMinutes());
// 	return `${hours}:${minutes}`;
// }


export const extractTime = (dateString) => {
	// const timeString12hr = new Date(dateString)
	// .toLocaleTimeString('en-US',
	//   {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
	// );
	console.log("extrachsfvbfsbtTime", convertUTCToLocalFormattedTime(dateString));
	return convertUTCToLocalFormattedTime(dateString);
};

function convertUTCToLocalFormattedTime(utcTimeString) {
    // Create a new Date object using the UTC time string
    var utcDate = new Date(utcTimeString);

    // Convert UTC time to local time
    var localDate = utcDate.toLocaleString();

	let ampm = localDate.split(",")[1].trim().split(" ")[1];
	let hour = localDate.split(",")[1].trim().split(" ")[0].split(":")[0];
	let min = localDate.split(",")[1].trim().split(" ")[0].split(":")[1];


	console.log("convertUTCToLocalFormattedTime", `${hour}:${min} ${ampm}`);
	


	return `${hour}:${min} ${ampm}`;
}

