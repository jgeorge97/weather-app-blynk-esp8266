export default defineCachedEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()

  const data = await $fetch(`https://blynk.cloud/external/api/isHardwareConnected?token=${runtimeConfig.apiToken}`) as boolean
  return data
}, { maxAge: 60, name: 'status' })
