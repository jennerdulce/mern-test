import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import goalService from './goalService'

const user = JSON.parse(localStorage.getItem('user'))

