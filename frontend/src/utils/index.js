import FileSaver from 'file-saver';
import { v4 as uuidv4 } from 'uuid';


export async function downloadImage(photo) {
	const _id = uuidv4();
	FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
