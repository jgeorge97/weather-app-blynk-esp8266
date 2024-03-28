type DataStreams = {
  v1: number
  v2: number
  v3: number
  v4: number
  v5: number
  v6: number
  v7: number
  v8: number
  v9: number
  v11: number
}

type Values = {
  iaq: number
  temperature: number
  humidity: number
  pressure: number
  co2Equivalent: number
  breathVOCEquivalent: number
  iaqAccuracy: number
  stabilisationStatus: number
  runInStabilisationStatus: number
  gasPercentage: number
}

export default defineCachedEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()

  const { v1, v2, v3, v4, v5, v6, v7, v8, v9, v11 } = await $fetch(`https://blynk.cloud/external/api/getAll?token=${runtimeConfig.apiToken}`) as DataStreams

  const data: Values = {
    iaq: v1,
    temperature: v2,
    humidity: v3,
    pressure: v4,
    co2Equivalent: v5,
    breathVOCEquivalent: v6,
    iaqAccuracy: v7,
    stabilisationStatus: v8,
    runInStabilisationStatus: v9,
    gasPercentage: v11
  }
  return data
}, {
  maxAge: 10,
  name: 'values'
})
