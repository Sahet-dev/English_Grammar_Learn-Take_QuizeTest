 import { defineStore } from 'pinia'
import apiClient from '../api/apiClient.js'

export const useUnitStore = defineStore('unitStore', {
    state: () => ({
        units: [],
        unitsCache: {},
        currentUnitId: null,
        loading: false,
        error: null
    }),

    getters: {
        currentUnit(state) {
            if (!state.currentUnitId) return null
            return state.unitsCache[state.currentUnitId] || null
        },

        currentUnitQuiz(state) {
            const unit = state.unitsCache[state.currentUnitId]
            return unit ? unit.quiz_details : null
        }
    },

    actions: {
        async loadData() {
            if (this.units.length > 0) {
                return
            }

            this.loading = true
            this.error = null

            try {
                const response = await apiClient.get('/units')
                this.units = response.data
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
                // Mark the “active” one
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
