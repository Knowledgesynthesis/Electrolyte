import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useSettings } from '@/stores/settings'
import { useTheme } from '@/stores/theme'
import { Moon, Sun, Type, Globe, RefreshCw } from 'lucide-react'

export default function Settings() {
  const settings = useSettings()
  const theme = useTheme()

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Settings</h1>
        <p className="text-xl text-muted-foreground">
          Customize your learning experience
        </p>
      </div>

      {/* Theme Settings */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-3">
            {theme.theme === 'dark' ? (
              <Moon className="w-6 h-6 text-primary" />
            ) : (
              <Sun className="w-6 h-6 text-primary" />
            )}
            <div>
              <CardTitle>Theme</CardTitle>
              <CardDescription>Choose your preferred color scheme</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button
              variant={theme.theme === 'light' ? 'default' : 'outline'}
              onClick={() => theme.setTheme('light')}
              className="flex-1"
            >
              <Sun className="w-4 h-4 mr-2" />
              Light
            </Button>
            <Button
              variant={theme.theme === 'dark' ? 'default' : 'outline'}
              onClick={() => theme.setTheme('dark')}
              className="flex-1"
            >
              <Moon className="w-4 h-4 mr-2" />
              Dark
            </Button>
            <Button
              variant={theme.theme === 'system' ? 'default' : 'outline'}
              onClick={() => theme.setTheme('system')}
              className="flex-1"
            >
              System
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Unit System */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Globe className="w-6 h-6 text-primary" />
            <div>
              <CardTitle>Unit System</CardTitle>
              <CardDescription>Select SI (mmol/L) or US (mEq/L) units</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button
              variant={settings.unitSystem === 'SI' ? 'default' : 'outline'}
              onClick={() => settings.setUnitSystem('SI')}
              className="flex-1"
            >
              SI Units (mmol/L)
            </Button>
            <Button
              variant={settings.unitSystem === 'US' ? 'default' : 'outline'}
              onClick={() => settings.setUnitSystem('US')}
              className="flex-1"
            >
              US Units (mEq/L)
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Note: For monovalent ions (Na⁺, K⁺), SI and US units are equivalent (1 mmol/L = 1 mEq/L).
            For divalent ions (Ca²⁺, Mg²⁺), 1 mmol/L = 2 mEq/L.
          </p>
        </CardContent>
      </Card>

      {/* Font Size */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Type className="w-6 h-6 text-primary" />
            <div>
              <CardTitle>Font Size</CardTitle>
              <CardDescription>Adjust text size for better readability</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button
              variant={settings.fontSize === 'small' ? 'default' : 'outline'}
              onClick={() => settings.setFontSize('small')}
              className="flex-1"
            >
              Small
            </Button>
            <Button
              variant={settings.fontSize === 'medium' ? 'default' : 'outline'}
              onClick={() => settings.setFontSize('medium')}
              className="flex-1"
            >
              Medium
            </Button>
            <Button
              variant={settings.fontSize === 'large' ? 'default' : 'outline'}
              onClick={() => settings.setFontSize('large')}
              className="flex-1"
            >
              Large
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Accessibility</CardTitle>
          <CardDescription>Enhanced accessibility features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">High Contrast Mode</p>
              <p className="text-sm text-muted-foreground">
                Enhanced contrast for better visibility
              </p>
            </div>
            <Button
              variant={settings.accessibilityMode ? 'default' : 'outline'}
              onClick={settings.toggleAccessibilityMode}
            >
              {settings.accessibilityMode ? 'Enabled' : 'Disabled'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reset Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <RefreshCw className="w-6 h-6 text-primary" />
            <div>
              <CardTitle>Reset Settings</CardTitle>
              <CardDescription>Restore all settings to their defaults</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Button
            variant="destructive"
            onClick={() => {
              settings.resetSettings()
              theme.setTheme('dark')
            }}
          >
            Reset to Defaults
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
