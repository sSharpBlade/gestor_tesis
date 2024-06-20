import { ActivityType } from "../Activities/activityType";

export const fetchActivities = async (
  thesisId: number
): Promise<ActivityType[]> => {
  try {
    const response = await fetch(
      `http://localhost:3000/activities/thesis/${thesisId}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.map((activity: any) => ({
      idActivity: activity.idActivity,
      dateActivity: activity.dateActivity,
      description: activity.description,
    }));
  } catch (error) {
    console.error("Error fetching activities:", error);
    return [];
  }
};
