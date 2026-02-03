interface Project {
  id: string
  title: string
  description: string
  category: string
  skills: string[]
  budgetType: string
  budgetAmount: string
  timeline: string
  campusScope: string
  visibility: string
  client: {
    name: string
    avatar: string
    rating: number
    campus: string
    verified: boolean
  }
  proposals: number
  postedAt: string
  urgent: boolean
  featured: boolean
}

interface Proposal {
  id: string
  projectId: string
  freelancer: {
    name: string
    avatar: string
    rating: number
    university: string
    verified: boolean
  }
  pitch: string
  budget: string
  timeline: string
  submittedAt: string
}

// Simple in-memory store (in a real app, this would be a database)
const projects: Project[] = []
const proposals: Proposal[] = []

export const projectStore = {
  addProject: (projectData: any) => {
    const newProject: Project = {
      id: Date.now().toString(),
      ...projectData,
      client: {
        name: "Current User", // This would come from auth context
        avatar: "/placeholder.svg",
        rating: 4.8,
        campus: "Stanford University",
        verified: true,
      },
      proposals: 0,
      postedAt: "Just now",
      urgent: false,
      featured: false,
    }
    projects.push(newProject)
    return newProject
  },

  getProjects: () => projects,

  addProposal: (proposalData: any) => {
    const newProposal: Proposal = {
      id: Date.now().toString(),
      ...proposalData,
      submittedAt: "Just now",
    }
    proposals.push(newProposal)

    // Update project proposal count
    const project = projects.find((p) => p.id === proposalData.projectId)
    if (project) {
      project.proposals += 1
    }

    return newProposal
  },

  getProposalsForProject: (projectId: string) => proposals.filter((p) => p.projectId === projectId),
}
