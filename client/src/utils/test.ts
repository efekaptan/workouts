import Axios from "axios";

export function getMockedHttp(data: [] | {}) {
    const mockedAxios = Axios as jest.Mocked<typeof Axios>;
    mockedAxios.get.mockResolvedValue({ data });
    return mockedAxios;
}
