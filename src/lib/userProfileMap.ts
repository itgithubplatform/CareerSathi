export class UserProfileMap {
  private static instance: UserProfileMap;
  private static userProfileMap:Map<string,string>|undefined
  private static userRoadmapsMap:Map<string,string>|undefined
  private constructor() {   
    if (!UserProfileMap.userProfileMap && !UserProfileMap.userRoadmapsMap) {
      UserProfileMap.userProfileMap = new Map<string,string>()
      UserProfileMap.userRoadmapsMap = new Map<string,string>()
    }
  }

  public static getInstance() {
    if (!UserProfileMap.instance) {
      UserProfileMap.instance = new UserProfileMap();
    }
    return UserProfileMap.instance;
  }
  getUserProfile(userId:string):string|undefined{
    return UserProfileMap.userProfileMap?.get(userId)
  }
  setUserProfile(userId:string,userData:string){
    UserProfileMap.userProfileMap?.set(userId,userData)
  }
  getUserRoadmap(userId:string):string|undefined{
    return UserProfileMap.userRoadmapsMap?.get(userId)
  }
  setUserRoadmap(userId:string,roadmapId:string){
    UserProfileMap.userRoadmapsMap?.set(userId,roadmapId)
  }
}
