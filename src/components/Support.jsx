import React from "react";
import { Star, Truck, MapPin } from "lucide-react";

export default function TrustBanner() {
  return (
    <div className="bg-green-50 border-t">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Why Choose EBE-FARMS?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900">Quality Guaranteed</h4>
              <p className="text-sm text-gray-600">All farmers vetted and products quality-checked</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900">Fast Delivery</h4>
              <p className="text-sm text-gray-600">Fresh produce delivered directly to your door</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900">Support Local</h4>
              <p className="text-sm text-gray-600">Directly supporting local farmers and communities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}