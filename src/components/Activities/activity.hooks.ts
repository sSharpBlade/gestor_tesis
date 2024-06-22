import { ActivityType } from "./activityType";

const url = "http://localhost:3000/activities";

export const request = async (id: number): Promise<ActivityType[]> => {
  const method = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(url + "/rep/" + id, method);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const val = (await response.json()) as ActivityType[];
    console.log(val)
    return val;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};


export const saveActivities = async (data: ActivityType): Promise<ActivityType> => {
  const method = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(url, method);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const savedActivity = await response.json();
    console.log("Activities saved successfully");
    return savedActivity;
  } catch (error) {
    console.error("Error saving activities:", error);
    throw error;
  }

};
export const updateActivities = async (data:ActivityType)=>{

  const method = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(url+'/'+data.idActivity, method);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    console.log("Activities Update successfully");
  } catch (error) {
    console.error("Error Update activities:", error);
    throw error;
  }
};
export const deleteActivities = async (id:number)=>{

  const method = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(url+'/'+id, method);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    console.log("Activities Delete successfully");
  } catch (error) {
    console.error("Error Delete activities:", error);
    throw error;
  }
};