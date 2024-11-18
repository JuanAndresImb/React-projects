import '/Users/juanandres/Documents/Repositories/web_dev_repo/Cours_webDev/react_juan/projects/hola-mundo/src/assets/App.css'
import { TwitterFollowCard } from './assets/TwitterFollowCard'

const users = [
    {
        userName: 'midudev',
        name: 'Miguel Angel Duran',
        isFollowing: true
    },
    {
        userName: 'TrevorGtaParody',
        name: 'Trevor Philips',
        isFollowing:true
    },
    {
        userName: 'Snake_MGS5',
        name: 'Snake',
        isFollowing: false
    }

]






export function App() {
    
    return (
        <section className='App'>
            {
                users.map(({ userName, name, isFollowing }) =>(
                        <TwitterFollowCard
                            key={userName}
                            userName={userName}
                            initialIsFollowing={isFollowing}
                        >
                            {name}
                        </TwitterFollowCard>
                    ))
                }
            
        </section>
  )
}