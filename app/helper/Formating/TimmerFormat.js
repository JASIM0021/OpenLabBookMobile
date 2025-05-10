export const  timmerFormat = (time) =>{

    

    const minute = Math.floor(time/60);

    const secound = time%60 

    return `${minute} : ${secound}`

}

export const  getTimeDifferenceInSeconds = (dateString)=> {
    const currentDate = new Date();
    const targetDate = new Date(dateString);
    
    // Ensure the target date is valid
    if (isNaN(targetDate.getTime())) {
      return 'Invalid Date';
    }
  
    // Calculate the time difference in seconds
    const timeDifferenceInSeconds = Math.floor((targetDate - currentDate  ) / 1000);
    
    return timeDifferenceInSeconds;
  }
export const  formatDrawTime = (dateString)=> {
    const date = new Date(dateString);
    
    // Ensure the date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
  
    // Get hours, minutes, and seconds
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    // Format the time as HH:mm
    const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    return formattedTime;
  }

 export function formatDate(date) {
    const currentDate = new Date(date);
  
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
  
    const formattedDate = `${month}/${day}/${year}`;
  
    return formattedDate;
  }