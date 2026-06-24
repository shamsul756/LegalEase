import { serverFetch } from '../server';

// নির্দিষ্ট আইনজীবীর সমস্ত অ্যাপয়েন্টমেন্ট বা কেস রেকর্ড নিয়ে আসার জন্য (Manage Appointments পেজের জন্য)
export const myAppointments = async (email) => {
  const result = await serverFetch(`/api/appointments/${email}`);
  return result;
};

// সার্চ ফিল্টার অনুযায়ী সব আইনজীবীদের তালিকা নিয়ে আসার জন্য (Browse/Find Lawyers পেজের জন্য)
export const fetchLawyers = async (query) => {
  const result = await serverFetch(`/api/lawyers?${query.toString()}`);
if(!result || !Array.isArray(result) || result == null){
  return []
}
  return result;
};

// কোনো ফিচারেড বা টপ আইনজীবীর তালিকা দেখানোর জন্য (যদি ব্যাকএন্ডে এপিআই থাকে)
export const fetchFeaturedLawyers = async () => {
  const result = await serverFetch(`/api/lawyers/featured`);
  return result;
};