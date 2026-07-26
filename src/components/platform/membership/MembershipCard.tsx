'use client'

import { Membership } from '@/interfaces/membership.interface'
import { DbProduct } from '@/interfaces/product.interface'
import { getMembershipDetails, formatDateShort, isMembershipActive } from '@/lib/membership-helpers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShieldCheck, Check } from 'lucide-react'
import { MdCardMembership } from 'react-icons/md'

interface MembershipCardProps {
  membership?: Membership | null
  variant?: 'admin' | 'user'
  membershipProduct?: DbProduct | null
  onAddMembership?: () => void
  onGrantAccess?: () => void
  onRevokeAccess?: () => void
  isSubmittingAccess?: boolean
}

const toneClasses: Record<string, string> = {
  success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-none',
  warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-none',
  danger: 'bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-400 border-none',
  neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-none',
}

const toneTextClasses: Record<string, string> = {
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-amber-600 dark:text-amber-400',
  danger: 'text-red-600 dark:text-red-400',
  neutral: 'text-slate-600 dark:text-slate-400',
}

const benefitsList = [
  'Acceso total al Dispensario Digital',
  'Acceso a variedades exclusivas y colecciones limitadas',
  'Beneficios y novedades continuas de la plataforma'
]

export const MembershipCard = ({
  membership,
  variant = 'user',
  onAddMembership,
  onGrantAccess,
  onRevokeAccess,
  isSubmittingAccess = false
}: MembershipCardProps) => {
  const details = getMembershipDetails(membership)
  const hasAccess = isMembershipActive(membership)

  const isNearExpiryOrExpired = details ? (details.isExpired || details.tone === 'warning') : true

  return (
    <Card className="h-full bg-card border border-border/50 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none">
        <ShieldCheck className="h-24 w-24 text-primary" />
      </div>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-bold text-foreground">
          <ShieldCheck className="h-5 w-5 text-primary" />
          {variant === 'user' ? 'Mi Membresía' : 'Suscripción'}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {details ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-border/40">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Estado</span>
              <Badge className={`text-xs font-bold uppercase ${toneClasses[details.tone]}`}>
                {details.statusLabel}
              </Badge>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-xs text-muted-foreground">Plan</span>
              <span className="text-sm font-semibold text-foreground">{details.productName}</span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-xs text-muted-foreground">Miembro desde</span>
              <span className="text-sm text-foreground">{formatDateShort(details.memberSince)}</span>
            </div>

            <div className="py-2 border-t border-b border-border/30 bg-muted/10 px-3 rounded-lg my-2">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  {details.isExpired ? 'Último período' : 'Período vigente'}
                </span>
                <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                  <span>{formatDateShort(details.startsAt)}</span>
                  <span className="text-muted-foreground">↓</span>
                  <span>{formatDateShort(details.expiresAt)}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-xs text-muted-foreground">
                {details.isExpired ? 'Venció' : 'Vence'}
              </span>
              <span className="text-sm font-semibold text-foreground">{formatDateShort(details.expiresAt)}</span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-xs text-muted-foreground">
                {details.isExpired ? 'Venció hace' : 'Tiempo restante'}
              </span>
              <span className={`text-sm font-bold ${toneTextClasses[details.tone]}`}>
                {details.isExpired ? (
                  details.daysDifference === 0 ? 'Venció hoy' : details.daysDifference === 1 ? 'Hace 1 día' : `Hace ${details.daysDifference} días`
                ) : (
                  details.daysDifference === 0 ? 'Vence hoy' : details.daysDifference === 1 ? 'Vence mañana' : `${details.daysDifference} días`
                )}
              </span>
            </div>

            {/* Actions for User / Admin */}
            {variant === 'admin' ? (
              <div className="pt-4">
                {hasAccess ? (
                  <Button
                    variant="destructive"
                    className="w-full text-xs font-semibold transition-colors"
                    onClick={onRevokeAccess}
                    disabled={isSubmittingAccess}
                  >
                    Revocar Acceso a Membresía
                  </Button>
                ) : (
                  <Button
                    className="w-full text-xs font-semibold bg-primary text-primary-foreground transition-colors"
                    onClick={onGrantAccess}
                    disabled={isSubmittingAccess}
                  >
                    Asignar Acceso a Membresía
                  </Button>
                )}
              </div>
            ) : (
              isNearExpiryOrExpired && onAddMembership && (
                <div className="pt-3">
                  <Button
                    onClick={onAddMembership}
                    className="w-full text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                  >
                    Renovar membresía
                  </Button>
                </div>
              )
            )}
          </div>
        ) : (
          /* No membership record */
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-border/40">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Estado</span>
              <Badge className={`text-xs font-bold uppercase ${toneClasses['neutral']}`}>
                Sin membresía activa
              </Badge>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed pt-1">
              Actualmente no cuentas con una membresía activa. Activa tu membresía para acceder al Dispensario y contenido exclusivo.
            </p>

            {variant === 'admin' ? (
              <div className="pt-2">
                <Button
                  className="w-full text-xs font-semibold bg-primary text-primary-foreground transition-colors"
                  onClick={onGrantAccess}
                  disabled={isSubmittingAccess}
                >
                  Asignar Acceso a Membresía
                </Button>
              </div>
            ) : (
              onAddMembership && (
                <div className="pt-2">
                  <Button
                    onClick={onAddMembership}
                    className="w-full text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <MdCardMembership className="h-4 w-4" /> Adquirir membresía
                  </Button>
                </div>
              )
            )}
          </div>
        )}

        {/* Benefits Section for User variant */}
        {variant === 'user' && (
          <div className="pt-4 border-t border-border/40 space-y-2">
            <p className="text-xs font-bold text-foreground uppercase tracking-wider">Tu membresía incluye:</p>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              {benefitsList.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
