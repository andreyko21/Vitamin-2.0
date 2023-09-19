import { db } from './InitFirebase';
import { getDoc } from 'firebase/firestore';
import { collection, doc } from 'firebase/firestore';

export function GetLocalStorageArray(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function SetLocalStorageArray(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}
export async function GetProduct(productData) {
  let product;
  const docRef = doc(collection(db, 'products'), productData.id);
  try {
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      product = data;
      product.amount = productData.amount;
      product.id = productData.id;
      product.autoship = productData.autoship;
      return product;
    } else {
      console.log('Документ не знайдено в Firestore.');
    }
  } catch (error) {
    console.error('Помилка при отриманні даних: ', error);
  }
}
