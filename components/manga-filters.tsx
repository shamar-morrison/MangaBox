"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RotateCcw, X } from "lucide-react"
import { useState } from "react"

export interface FilterOptions {
  status: string[]
  contentRating: string[]
  publicationDemographic: string[]
  sortBy: string
  sortOrder: "asc" | "desc"
}

interface MangaFiltersProps {
  onFiltersChange: (filters: FilterOptions) => void
  isOpen: boolean
  onClose: () => void
}

const statusOptions = [
  { value: "ongoing", label: "Ongoing" },
  { value: "completed", label: "Completed" },
  { value: "hiatus", label: "Hiatus" },
  { value: "cancelled", label: "Cancelled" },
]

const contentRatingOptions = [
  { value: "safe", label: "Safe" },
  { value: "suggestive", label: "Suggestive" },
  { value: "erotica", label: "Erotica" },
]

const demographicOptions = [
  { value: "shounen", label: "Shounen" },
  { value: "shoujo", label: "Shoujo" },
  { value: "josei", label: "Josei" },
  { value: "seinen", label: "Seinen" },
]

const sortOptions = [
  { value: "followedCount", label: "Popularity" },
  { value: "latestUploadedChapter", label: "Latest Updated" },
  { value: "title", label: "Title" },
  { value: "year", label: "Year" },
  { value: "createdAt", label: "Date Added" },
  { value: "rating", label: "Rating" },
]

export function MangaFilters({ onFiltersChange, isOpen, onClose }: MangaFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    status: [],
    contentRating: ["safe", "suggestive"],
    publicationDemographic: [],
    sortBy: "followedCount",
    sortOrder: "desc",
  })

  const handleFilterChange = (key: keyof FilterOptions, value: string | string[] | "asc" | "desc") => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleArrayFilterToggle = (key: keyof FilterOptions, value: string) => {
    const currentArray = filters[key] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value]
    
    handleFilterChange(key, newArray)
  }

  const resetFilters = () => {
    const defaultFilters: FilterOptions = {
      status: [],
      contentRating: ["safe", "suggestive"],
      publicationDemographic: [],
      sortBy: "followedCount",
      sortOrder: "desc",
    }
    setFilters(defaultFilters)
    onFiltersChange(defaultFilters)
  }

  const getActiveFiltersCount = () => {
    return (
      filters.status.length +
      (filters.contentRating.length !== 2 ? 1 : 0) + // Only count if not default
      filters.publicationDemographic.length +
      (filters.sortBy !== "followedCount" || filters.sortOrder !== "desc" ? 1 : 0)
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Filter Manga</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-gray-400 hover:text-white"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Sort Options */}
          <div className="space-y-3">
            <Label className="text-white font-medium">Sort By</Label>
            <div className="flex gap-2">
              <Select
                value={filters.sortBy}
                onValueChange={(value: string) => handleFilterChange("sortBy", value)}
              >
                <SelectTrigger className="flex-1 bg-gray-800 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {sortOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="text-white hover:bg-gray-700"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select
                value={filters.sortOrder}
                onValueChange={(value: "asc" | "desc") => handleFilterChange("sortOrder", value)}
              >
                <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="desc" className="text-white hover:bg-gray-700">Desc</SelectItem>
                  <SelectItem value="asc" className="text-white hover:bg-gray-700">Asc</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Status Filter */}
          <div className="space-y-3">
            <Label className="text-white font-medium">Status</Label>
            <div className="grid grid-cols-2 gap-3">
              {statusOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`status-${option.value}`}
                    checked={filters.status.includes(option.value)}
                    onCheckedChange={() => handleArrayFilterToggle("status", option.value)}
                    className="border-gray-600"
                  />
                  <Label
                    htmlFor={`status-${option.value}`}
                    className="text-gray-300 text-sm cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Content Rating Filter */}
          <div className="space-y-3">
            <Label className="text-white font-medium">Content Rating</Label>
            <div className="grid grid-cols-2 gap-3">
              {contentRatingOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${option.value}`}
                    checked={filters.contentRating.includes(option.value)}
                    onCheckedChange={() => handleArrayFilterToggle("contentRating", option.value)}
                    className="border-gray-600"
                  />
                  <Label
                    htmlFor={`rating-${option.value}`}
                    className="text-gray-300 text-sm cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Publication Demographic Filter */}
          <div className="space-y-3">
            <Label className="text-white font-medium">Demographic</Label>
            <div className="grid grid-cols-2 gap-3">
              {demographicOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`demo-${option.value}`}
                    checked={filters.publicationDemographic.includes(option.value)}
                    onCheckedChange={() => handleArrayFilterToggle("publicationDemographic", option.value)}
                    className="border-gray-600"
                  />
                  <Label
                    htmlFor={`demo-${option.value}`}
                    className="text-gray-300 text-sm cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Active Filters */}
          {getActiveFiltersCount() > 0 && (
            <div className="space-y-3">
              <Label className="text-white font-medium">Active Filters</Label>
              <div className="flex flex-wrap gap-2">
                {filters.status.map((status) => (
                  <Badge
                    key={status}
                    variant="secondary"
                    className="bg-purple-600/20 text-purple-300 border-purple-500/30"
                  >
                    Status: {statusOptions.find(o => o.value === status)?.label}
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() => handleArrayFilterToggle("status", status)}
                    />
                  </Badge>
                ))}
                
                {filters.contentRating.length !== 2 && (
                  <Badge
                    variant="secondary"
                    className="bg-purple-600/20 text-purple-300 border-purple-500/30"
                  >
                    Content: {filters.contentRating.length} selected
                  </Badge>
                )}
                
                {filters.publicationDemographic.map((demo) => (
                  <Badge
                    key={demo}
                    variant="secondary"
                    className="bg-purple-600/20 text-purple-300 border-purple-500/30"
                  >
                    {demographicOptions.find(o => o.value === demo)?.label}
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() => handleArrayFilterToggle("publicationDemographic", demo)}
                    />
                  </Badge>
                ))}
                
                {(filters.sortBy !== "followedCount" || filters.sortOrder !== "desc") && (
                  <Badge
                    variant="secondary"
                    className="bg-purple-600/20 text-purple-300 border-purple-500/30"
                  >
                    Sort: {sortOptions.find(o => o.value === filters.sortBy)?.label} ({filters.sortOrder})
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Apply Button */}
          <div className="pt-4">
            <Button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700"
            >
              Apply Filters
              {getActiveFiltersCount() > 0 && (
                <Badge variant="secondary" className="ml-2 bg-white/20">
                  {getActiveFiltersCount()}
                </Badge>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 