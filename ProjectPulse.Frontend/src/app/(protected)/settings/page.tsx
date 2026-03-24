import { PageHeader } from "@/components/shared/page-header"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; 
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input";


export default function SettingsPage()
{ return <div className="space-y-6">
    <PageHeader title="Settings & Profile" description="Manage profile details, password UI, theme preference, and session controls." />
    <div className="grid gap-6 xl:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Input defaultValue="Admin User" />
                <Input defaultValue="admin@projectpulse.io" />
                <Button>Save profile</Button>
            
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Input type="password" placeholder="Current password" />
                <Input type="password" placeholder="New password" />
                <Input type="password" placeholder="Confirm password" />
                <Button>Update password</Button>
            </CardContent>
            </Card>
    </div>
    <Card>
        <CardHeader>
            <CardTitle>Session & preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-500">
            <p>Theme is handled through next-themes with system, light, and dark support.</p>
            <p>JWT storage is mocked for demo purposes and ready for backend integration.</p>
        </CardContent>
    </Card>
</div>; 
}
