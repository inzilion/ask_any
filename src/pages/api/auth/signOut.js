import { getServerSession } from 'next-auth';
import { signOut} from "next-auth/react";
import { authOptions } from './[...nextauth]';

export default async function handler(req, res){
  const session = getServerSession(req, res, authOptions);
  signOut();
  return res.redirect(302, "/");
}