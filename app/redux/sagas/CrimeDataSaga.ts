import { call, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { fetchCrimeRequest, fetchCrimeSuccess, fetchCrimeFailure } from '../Slices/CrimeDstaSlice';
interface CrimeData {
    id: string;
    case_number: string;
    date: string;
    block: string;
    iucr: string;
    primary_type: string;
    description: string;
    location_description: string;
    arrest: boolean;
    domestic: boolean;
    beat: string;
    district: string;
    ward: string;
    community_area: string;
    fbi_code: string;
    x_coordinate: string;
    y_coordinate: string;
    year: string;
    updated_on: string;
    latitude: string;
    longitude: string;
    location: {
      latitude: string;
      longitude: string;
      human_address: string;
    };
  }
function fetchCrimeDataApi():Promise<AxiosResponse<CrimeData[]>> {
  return axios.get(
    'https://data.cityofchicago.org/resource/ijzp-q8t2.json?$query=SELECT%0A%20%20%60id%60%2C%0A%20%20%60case_number%60%2C%0A%20%20%60date%60%2C%0A%20%20%60block%60%2C%0A%20%20%60iucr%60%2C%0A%20%20%60primary_type%60%2C%0A%20%20%60description%60%2C%0A%20%20%60location_description%60%2C%0A%20%20%60arrest%60%2C%0A%20%20%60domestic%60%2C%0A%20%20%60beat%60%2C%0A%20%20%60district%60%2C%0A%20%20%60ward%60%2C%0A%20%20%60community_area%60%2C%0A%20%20%60fbi_code%60%2C%0A%20%20%60x_coordinate%60%2C%0A%20%20%60y_coordinate%60%2C%0A%20%20%60year%60%2C%0A%20%20%60updated_on%60%2C%0A%20%20%60latitude%60%2C%0A%20%20%60longitude%60%2C%0A%20%20%60location%60%0AORDER%20BY%20%60date%60%20DESC%20NULL%20FIRST'
  );
}

function* fetchCrimeDataSaga(): Generator<any, void, AxiosResponse<CrimeData[]>> {
  try {
    const response = yield call(fetchCrimeDataApi);
    yield put(fetchCrimeSuccess(response.data));
  } catch (error) {
    const axiosError = error as AxiosError;
    yield put(fetchCrimeFailure(axiosError.message));
  }
}

export default function* watchFetchCrimeData() {
  yield takeLatest(fetchCrimeRequest.type, fetchCrimeDataSaga);
}
