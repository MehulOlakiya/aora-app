import { Client, Account ,ID, Avatars, Databases, Query} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.mehul.aora",
  projectId: "66684751000368bf1304",
  databaseId: "6668487f00335d05f914",
  userCollectionId: "666848c700386eec0b65",
  videoCollectionId: "666849a20000ae2b838d",
  storageId: "66685444003276c9796b",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatar = new Avatars(client)
const dabase = new Databases(client)

export const createUser = async (email,password, username) => {
 try {
   const newAccount = await account.create(ID.unique() , email ,password,username)
   if(!newAccount) throw Error

   const avatarUrl =  avatar.getInitials()
   await signIn(email,password)
   const newUser = await dabase.createDocument(config.databaseId,config.userCollectionId,ID.unique(),{
    accountId:newAccount.$id,
    email,
    username,
    avatar:avatarUrl
   })
   return newUser
 } catch (error) {
  console.log('error',error)
  throw new Error(error)
 }
};

export const signIn = async (email,password) =>{
  try {
    const session = await account.createEmailPasswordSession(email,password)
    console.log('session',session)
    return session
  } catch (error) {
    console.log('error',error)
    throw new Error(error)
  }
}

export const getCurrentUser = async () =>{
  try {
    const currentAccount = await account.get()

    if(!currentAccount) throw Error

    const currentUser = await dabase.listDocuments(config.databaseId,config.userCollectionId,[Query.equal("accountId",currentAccount.$id)])
    return currentUser
  } catch (error) {
    console.log('error',error)
    throw new Error(error)
  }
}
