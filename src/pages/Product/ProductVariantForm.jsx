import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';

const ProductVariantForm = ({
                                variant,
                                index,
                                onVariantChange,
                                onRemove,
                                canRemove,
                                errors = {}
                            }) => {
    const handleInputChange = (field, value) => {
        onVariantChange(variant.id, field, value);
    };

    return (
        <Card className="variant-card">
            <CardHeader>
                <div className="variant-header">
                    <CardTitle className="variant-title">
                        Variant {index + 1}
                    </CardTitle>
                    {canRemove && (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={onRemove}
                            className="remove-variant-btn"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <div className="variant-form-grid">
                    <div className="form-group">
                        <Label htmlFor={`variant_code_${variant.id}`}>
                            Variant Code *
                        </Label>
                        <Input
                            id={`variant_code_${variant.id}`}
                            value={variant.variant_code}
                            onChange={(e) => handleInputChange('variant_code', e.target.value)}
                            placeholder="e.g., VAR-001"
                            className={errors.variant_code ? 'error' : ''}
                        />
                        {errors.variant_code && (
                            <span className="error-text">{errors.variant_code}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <Label htmlFor={`size_${variant.id}`}>Size</Label>
                        <Input
                            id={`size_${variant.id}`}
                            value={variant.size}
                            onChange={(e) => handleInputChange('size', e.target.value)}
                            placeholder="e.g., 15 inch, Large, 50mm"
                        />
                    </div>

                    <div className="form-group">
                        <Label htmlFor={`color_${variant.id}`}>Color</Label>
                        <Input
                            id={`color_${variant.id}`}
                            value={variant.color}
                            onChange={(e) => handleInputChange('color', e.target.value)}
                            placeholder="e.g., Black, Red, Silver"
                        />
                    </div>

                    <div className="form-group">
                        <Label htmlFor={`price_${variant.id}`}>
                            Selling Price (RWF) *
                        </Label>
                        <Input
                            id={`price_${variant.id}`}
                            type="number"
                            step="0.01"
                            min="0"
                            value={variant.price}
                            onChange={(e) => handleInputChange('price', e.target.value)}
                            placeholder="0.00"
                            className={errors.price ? 'error' : ''}
                        />
                        {errors.price && (
                            <span className="error-text">{errors.price}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <Label htmlFor={`cost_price_${variant.id}`}>
                            Cost Price (RWF)
                        </Label>
                        <Input
                            id={`cost_price_${variant.id}`}
                            type="number"
                            step="0.01"
                            min="0"
                            value={variant.cost_price}
                            onChange={(e) => handleInputChange('cost_price', e.target.value)}
                            placeholder="0.00"
                            className={errors.cost_price ? 'error' : ''}
                        />
                        {errors.cost_price && (
                            <span className="error-text">{errors.cost_price}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <Label htmlFor={`weight_${variant.id}`}>Weight (kg)</Label>
                        <Input
                            id={`weight_${variant.id}`}
                            type="number"
                            step="0.01"
                            min="0"
                            value={variant.weight}
                            onChange={(e) => handleInputChange('weight', e.target.value)}
                            placeholder="0.00"
                        />
                    </div>

                    <div className="form-group">
                        <Label htmlFor={`stock_${variant.id}`}>Current Stock</Label>
                        <Input
                            id={`stock_${variant.id}`}
                            type="number"
                            step="0.01"
                            min="0"
                            value={variant.stock}
                            onChange={(e) => handleInputChange('stock', e.target.value)}
                            placeholder="0"
                        />
                    </div>

                    <div className="form-group">
                        <Label htmlFor={`min_stock_${variant.id}`}>
                            Minimum Stock Level
                        </Label>
                        <Input
                            id={`min_stock_${variant.id}`}
                            type="number"
                            step="0.01"
                            min="0"
                            value={variant.min_stock_level}
                            onChange={(e) => handleInputChange('min_stock_level', e.target.value)}
                            placeholder="0"
                        />
                    </div>

                    <div className="form-group full-width">
                        <Label htmlFor={`specification_${variant.id}`}>
                            Specifications
                        </Label>
                        <Textarea
                            id={`specification_${variant.id}`}
                            value={variant.specification}
                            onChange={(e) => handleInputChange('specification', e.target.value)}
                            placeholder="Enter variant specifications"
                            rows={3}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductVariantForm;