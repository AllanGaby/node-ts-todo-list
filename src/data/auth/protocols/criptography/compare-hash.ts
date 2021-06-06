export type CompareHashDTO = {
  payload: string
  hash: string
}

export interface CompareHash {
  compare: (data: CompareHashDTO) => Promise<boolean>
}
