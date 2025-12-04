"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ButtonCustom } from "@/components/ui/custom/button-custom";
import { AlertTriangle, Coins, Plus, Sparkles } from "lucide-react";
import Link from "next/link";
import { DialogContentCustom } from "../ui/custom/dialog-custom";
import { AiSparklesIcon } from "@/lib/icons/ai-sparkles";

interface InsufficientCreditsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    creditsRemaining: number;
    creditsNeeded: number;
}

export function InsufficientCreditsDialog({
    open,
    onOpenChange,
    creditsRemaining,
    creditsNeeded,
}: InsufficientCreditsDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContentCustom title="Insufficient Credits">
                <div className="space-y-4 w-full">
                    <p className="text-muted-foreground">
                        You need {creditsNeeded} credit{creditsNeeded !== 1 ? 's' : ''} for this conversion,
                        but you only have {creditsRemaining}.
                    </p>

                    <div className="bg-gradient-to-r from-blue-50 to-violet-50 p-4 rounded-xl w-full">
                        <div className="flex items-start gap-3">
                            <AiSparklesIcon className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div className="text-left">
                                <p className="font-medium text-sm text-blue-900">Upgrade to unlock more credits</p>
                                <p className="text-xs text-blue-700 mt-1">
                                    Get 50-500 credits per month with our Pro and Enterprise plans
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 w-full pt-4 justify-end">
                        <ButtonCustom
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="w-28"
                        >
                            Cancel
                        </ButtonCustom>
                        <ButtonCustom variant="main">
                            <Plus />
                            Buy credits
                        </ButtonCustom>
                    </div>
                </div>
            </DialogContentCustom>
        </Dialog>
    );
}
