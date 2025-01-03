 import { defineStore } from 'pinia'
import apiClient from '../api/apiClient.js'

export const useUnitStore = defineStore('unitStore', {
    state: () => ({
        units: [],
        unitsCache: {},
        currentUnitId: null,
        loading: false,
        error: null,
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
    }),

    getters: {
        currentUnit(state) {
            try {
                if (!state.currentUnitId) return null
                return state.unitsCache[state.currentUnitId] || null
            } catch (err) {
                console.error("Error in getter currentUnit:", err)
                return null
            }
        },

        currentUnitQuiz(state) {
            const unit = this.currentUnit
            if (unit && unit.quiz_details) {
                return unit.quiz_details
            }
            return []  // Return empty array if quiz_details is not available
        }
    },

    actions: {
        async loadData(page = 1) {
            if (this.unitsCache[page]) {
                this.units = this.unitsCache[page].data || []
                this.currentPage = page
                return
            }
            this.loading = true
            this.error = null

            try {
                const response = await apiClient.get(`/units?page=${page}`)
                const { data, meta } = response.data

                this.units = data
                this.currentPage = meta.current_page
                this.totalPages = meta.last_page
                this.totalItems = meta.total
                this.unitsCache[page] = response.data
            } catch (err) {
                this.error = err?.response?.data || err.message
                console.error('Error fetching units:', this.error)
            } finally {
                this.loading = false
            }
        },

        async fetchUnitById(unitId) {
            if (this.unitsCache[unitId]) {
                this.currentUnitId = unitId
                return
            }

            this.loading = true
            this.error = null
            this.currentUnitId = null

            try {
                const response = await apiClient.get(`/units/${unitId}`)
                this.unitsCache[unitId] = response.data
                this.currentUnitId = unitId
            } catch (err) {
                this.error = err?.response?.data || err.message
                console.error('Error fetching single unit:', this.error)
            } finally {
                this.loading = false
            }
        },

        async loadQuestions() {
            const unit = this.currentUnit
            if (unit && unit.quiz_details) {
                return unit.quiz_details
            }

            if (this.loading) return

            this.loading = true
            this.error = null

            try {
                const response = await apiClient.get(`/quizzes/${this.currentUnitId}`)
                const unitData = response.data

                if (unitData && unitData.quiz_details) {
                    // Cache quiz details along with the unit
                    this.unitsCache[this.currentUnitId].quiz_details = unitData.quiz_details
                    return unitData.quiz_details
                } else {
                    console.warn('No quiz data found for the given unit.')
                    return []
                }
            } catch (error) {
                this.error = error.response ? error.response.data : error.message
                console.error('Error fetching quiz data:', this.error)
                return []
            } finally {
                this.loading = false
            }
        }
    }
})
