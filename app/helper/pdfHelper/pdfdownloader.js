
import * as Print from 'expo-print';


const PdfDownloadAndOpen = async (base64PdfString) => {
  try {
    // Decode base64 string
  

    await Print.printAsync({uri:`data:application/pdf;base64,${base64PdfString}`})
    // Convert the decoded string to a Uint8Array
   

  } catch (error) {
    console.error(error);
  }
};

export default PdfDownloadAndOpen;
